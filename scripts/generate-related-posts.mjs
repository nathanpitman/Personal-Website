import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');
const MAX_RELATED = 5;

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','was','are','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might',
  'shall','can','this','that','these','those','what','which','who','whom',
  'when','where','why','how','all','each','every','both','few','more',
  'most','other','some','such','not','only','same','so','than','too',
  'very','just','now','then','here','there','its','it','he','she','we',
  'they','you','our','his','her','their','my','your','also','about',
  'into','after','before','over','under','again','further','once','any',
  'no','nor','as','if','while','although','though','because','since',
  'until','unless','however','therefore','thus','hence','yet','still',
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w));
}

function buildTFIDF(docs) {
  const tokenized = docs.map(d => tokenize(d));

  const tf = tokenized.map(tokens => {
    const freq = {};
    for (const t of tokens) freq[t] = (freq[t] || 0) + 1;
    const total = tokens.length || 1;
    const result = {};
    for (const [t, c] of Object.entries(freq)) result[t] = c / total;
    return result;
  });

  const N = docs.length;
  const df = {};
  for (const tokens of tokenized) {
    for (const t of new Set(tokens)) df[t] = (df[t] || 0) + 1;
  }
  const idf = {};
  for (const [t, n] of Object.entries(df)) idf[t] = Math.log(N / n);

  return tf.map(tfVec => {
    const vec = {};
    for (const [t, v] of Object.entries(tfVec)) {
      const score = v * (idf[t] || 0);
      if (score > 0) vec[t] = score;
    }
    return vec;
  });
}

function cosineSim(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (const [t, v] of Object.entries(a)) {
    if (b[t]) dot += v * b[t];
    magA += v * v;
  }
  for (const v of Object.values(b)) magB += v * v;
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function titleWords(title) {
  return new Set(tokenize(title));
}

function run() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const allSlugs = new Set(files.map(f => f.replace(/\.md$/, '')));

  const posts = files.map(filename => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
    const parsed = matter(raw);
    return {
      filename,
      slug: filename.replace(/\.md$/, ''),
      data: parsed.data,
      content: parsed.content,
      raw,
    };
  });

  // Separate posts to process (no existing relatedPosts, not hidden) from the full corpus
  const corpus = posts.filter(p => !p.data.hidden);
  const toProcess = corpus.filter(p => !p.data.relatedPosts);

  if (toProcess.length === 0) {
    console.log('All posts already have relatedPosts — nothing to do.');
    return;
  }

  console.log(`Processing ${toProcess.length} posts (${corpus.length - toProcess.length} skipped — already have relatedPosts)`);

  // Build TF-IDF over full visible corpus so IDF reflects all posts
  const tfidfVectors = buildTFIDF(corpus.map(p => p.content));
  const corpusIndex = new Map(corpus.map((p, i) => [p.slug, i]));

  let written = 0;

  for (const post of toProcess) {
    const idx = corpusIndex.get(post.slug);
    const postVec = tfidfVectors[idx];
    const postTitleWords = titleWords(post.data.title);
    const postTags = new Set((post.data.tags || []).map(t => t.toLowerCase()));

    const scores = corpus
      .filter(other => other.slug !== post.slug)
      .map(other => {
        const otherIdx = corpusIndex.get(other.slug);
        const otherVec = tfidfVectors[otherIdx];

        const tfidfScore = cosineSim(postVec, otherVec);

        const otherTags = new Set((other.data.tags || []).map(t => t.toLowerCase()));
        let tagOverlap = 0;
        for (const tag of postTags) {
          if (otherTags.has(tag)) tagOverlap++;
        }

        const otherTitleWords = titleWords(other.data.title);
        let titleOverlap = 0;
        for (const w of postTitleWords) {
          if (otherTitleWords.has(w)) titleOverlap++;
        }

        return {
          slug: other.slug,
          score: tfidfScore + tagOverlap * 3 + titleOverlap * 0.5,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RELATED)
      .filter(r => allSlugs.has(r.slug));

    if (scores.length === 0) continue;

    const relatedPosts = scores.map(r => ({ slug: r.slug, source: 'generated' }));
    const parsed = matter(post.raw);
    parsed.data.relatedPosts = relatedPosts;

    // Preserve YYYY-MM-DD string to avoid timezone-drift when js-yaml serializes Date objects
    if (parsed.data.date instanceof Date) {
      const d = parsed.data.date;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      parsed.data.date = `${yyyy}-${mm}-${dd}`;
    }

    const output = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(path.join(POSTS_DIR, post.filename), output, 'utf8');
    written++;
  }

  console.log(`Done. Wrote relatedPosts to ${written} posts.`);
}

run();
