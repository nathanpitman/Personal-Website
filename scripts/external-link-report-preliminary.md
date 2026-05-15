# External Link Audit — Preliminary Report (Static Analysis)

_Generated: 2026-05-15 — based on domain knowledge, not live HTTP checks._

**This report covers only external links (nathanpitman.com self-links were handled separately).**

Run `node scripts/check-external-links.mjs --fix` locally to perform live HTTP checks,
query the Wayback Machine for dead links, and auto-patch posts with archive URLs.

---

## Summary

| Category | Unique URLs | Notes |
|---|---|---|
| External unique links (excl. self & archive) | 644 | Across 290 domains |
| Self-links fixed (body only) | 53 | Updated to `/posts/slug` in 36 files |
| Self-links unresolvable | 80 | File resources, lost posts, PHP-era links |

---

## Confirmed Defunct Domains

These domains are definitely dead based on their known history.
All 🔴 links in your posts will 404 or not resolve at all.

### macromedia.com (38 links)
Adobe acquired Macromedia in December 2005. The macromedia.com domain has
been defunct for over a decade — all specific URLs (product pages, tutorial articles,
developer docs) are completely dead. Adobe did not preserve most of the content.

**Posts affected:** Most Fireworks, Flash, and Dreamweaver-era posts.
**Action:** Run the local script — these will have Wayback Machine snapshots.

### senocular.com (15 links)
Tom Krcha's Flash/ActionScript tutorial site. Tom later worked at Adobe and the
site was not maintained after Flash's decline. Likely completely offline.

**Action:** Run local script for Wayback snapshots.

### pmachine.com (6 links)
pMachine Pro was a blogging platform that became ExpressionEngine. The pmachine.com
domain was abandoned after the rebranding to EllisLab/ExpressionEngine.

### projectfireworks.com (6 links)
Adobe Fireworks community and resource site. Adobe EOL'd Fireworks in 2013 and
the community sites progressively went offline.

### phireworx.com (6 links)
A Fireworks plugins and extensions site. Defunct since Fireworks was discontinued.

### markme.com (6 links)
A social bookmarking / tag aggregation service from the del.icio.us era.
Shut down circa 2007–2008.

### sitevista.com (6 links)
A web accessibility and CSS layout testing service (showed how sites looked in
various browsers). Defunct.

### communitymx.com (4 links)
Macromedia and then Adobe community tutorial site. Went offline after Adobe's
restructuring. Run local script for Wayback Machine.

### carsonworkshops.com (3 links)
Future of Web Apps (FOWA) conference series run by Ryan Carson / Carsonified.
Site was taken offline after the conferences ended.

### bebrave.biz (3 links)
Unknown site, almost certainly defunct given the .biz TLD and era.

### forgetfoo.com (3 links)
Defunct personal or project site.

### mirashade.com (3 links)
Defunct site. No information on what it was.

### talkr.com (2 links)
A text-to-speech podcast/audioblog service ("make your blog talk"). Defunct.
Referenced in `listen-to-me-talkr-kinda.md`.

### textdrive.com (2 links)
A well-regarded web host from the Rails/TextPattern era, acquired by Joyent.
The textdrive.com brand was retired.

### geourl.org (2 links)
A geographic URL ping service (ICBM coordinates in blog headers). Defunct.

### huddletogether.com (2 links)
A collaboration/productivity tool startup. Defunct.

### slimdevices.com (2 links)
Slim Devices made the Squeezebox network music player. Acquired by Logitech
in 2006 — the slimdevices.com domain was subsequently retired.

### snubcommunications.com (2 links)
Small UK design agency. Likely defunct.

### bancroftdevelopments.com (2 links)
Small web development studio. Likely defunct.

### aftershape.com (2 links)
Design studio. Likely defunct.

### klynch.com (2 links)
Personal site. May or may not still exist.

### ninefour.co.uk (5 links)
Your old company domain. Likely pointing somewhere else now or parked.

---

## Domains That Changed Significantly

These domains still exist but the linked content is almost certainly gone or changed.

### twitter.com (8 links)
Now X.com. The domain still responds but URL redirects to x.com may break or
the specific tweets may be deleted. Worth verifying.

### macromedia.com → adobe.com (38 links)
The domain likely redirects to adobe.com but the specific Macromedia page paths
don't have Adobe equivalents.

### flickr.com (19 links)
Flickr still exists but photos from 2002–2013 linked in posts may be:
- Private (user made them private)
- Deleted (free accounts had limits imposed in 2018)
- Still public

The live check script will tell you definitively.

### delicious.com (3 links)
del.icio.us / Delicious has changed hands multiple times (Yahoo → AVOS → Pinboard
→ eventually retired). Specific bookmarked URLs are likely gone.

### expressionengine.com (11 links)
EllisLab renamed to ExpressionEngine Inc and the site is still live, but many
linked documentation URLs from the 2006–2013 era will have changed paths.

### maps.google.co.uk / google.co.uk / local.google.co.uk (5 links)
Old Google Maps URLs (non-embed format from 2004–2007) will not work. Google
rebuilt Maps completely and old URL formats are dead.

### ign.com / ps3.ign.com (7 links)
IGN still exists but the old console-specific subdomains (ps3.ign.com) were
retired. Specific article URLs from 2005–2007 may redirect or 404.

### joshuaink.com (6 links)
Jon Oxton's blog. May still exist — verify with the live check.

### allinthehead.com (7 links)
Drew McLellan's blog. May still exist — verify with the live check.

### hicksdesign.co.uk (8 links)
Jon Hicks' design studio site. May still exist — verify.

### webuser.co.uk (8 links)
UK tech magazine. May still exist but old article URLs from 2004–2007 are
unlikely to work.

---

## Likely Still Active

These domains are almost certainly still alive. Specific article/deep links may
or may not work — the live check will confirm.

| Domain | Links | Notes |
|---|---|---|
| github.com | 14 | Active; repo/gist links may have moved |
| wikipedia.org | 12 | Very stable URLs |
| alistapart.com | 3 | Still active web design publication |
| textpattern.com | 6 | CMS still in development |
| adobe.com / blogs.adobe.com | 6 | Active; blog subdomain may have moved |
| mozilla.org | 5 | Active; old MDN/Bugzilla URLs may vary |
| kottke.org | 2 | Still active (one of the oldest blogs) |
| theregister.co.uk | 4 | Still active tech news |
| bbc.co.uk / news.bbc.co.uk | 7 | Active; old news URLs use different format now |
| imdb.com | 4 | Active; URLs are stable |
| andybudd.com | 2 | Active designer/author blog |
| amazon.co.uk / amazon.com | 5 | Active; product links may be stale |
| solspace.com | 5 | EE add-on developer — verify |
| clearleft.com | 1 | Active UX agency |
| w3c.org | 1 | Active |
| drupal.org | 1 | Active |

---

## Run the Live Check

The static analysis above is based on knowledge, not real HTTP checks. To get
definitive results and auto-fix dead links with Wayback Machine archive URLs:

```bash
# From the project root:
node scripts/check-external-links.mjs --fix

# Dry run (see what would change without modifying files):
node scripts/check-external-links.mjs --fix --dry-run

# Faster with more concurrency on a fast connection:
CONCURRENCY=30 node scripts/check-external-links.mjs --fix
```

This will:
1. Check all 644 external links via HTTP
2. Query the Wayback Machine for every dead link
3. Auto-replace dead links with archive URLs in the posts (with `--fix`)
4. Write `scripts/external-link-results.json` — full machine-readable results
5. Write `scripts/external-link-report.md` — updated human-readable report

---

## Unresolvable Self-Links (for reference)

These old nathanpitman.com URLs in post bodies could not be mapped to any
current post slug. They point to lost content (unmigrated posts, uploaded files,
images, PHP-era URLs). No action needed — they are what they are.

| URL | In post |
|---|---|
| `http://www.nathanpitman.com/blog/index.php?id=34` | `2-fingers-up-to-copy-control-audio-cds-again.md` |
| `http://nathanpitman.com/621/4-person-office-to-rent…` | `4-person-office-to-rent-in-crowthorne-berkshire.md` |
| `http://nathanpitman.com/journal/404/` | `a-fresh-lick-of-paint-for-pro-bel.md` |
| `http://nathanpitman.com/images/smileys/smile.gif` | `adding-on-hover-copyright-to-lightbox.md` |
| `http://nathanpitman.com/608/alternatives-to-flash…` | `alternatives-to-flash-for-animation…md` |
| `http://nathanpitman.com/files/nathan_cv_05_05_web.pdf` | `available.md` |
| `http://nathanpitman.com/journal/578/migrating-from-txp…` | `blogging-the-migration…md` |
| `http://nathanpitman.com/550/building-websites-with-ee-16` | `building-websites-with-expressionengine-1-6.md` |
| `http://nathanpitman.com/files/3797_ExpressionEngine_Sample_Chapter.pdf` | `building-websites-with-expressionengine-1-6.md` |
| `http://nathanpitman.com/209/does-the-kottkeorg-re-design…` | `does-the-kottke-org-re-design-kinda-suck.md` |
| `http://www.nathanpitman.com/source/extensions.php` | `dreamweaver-extensions-going-pete-tong.md` |
| `http://nathanpitman.com/111/duplicate-and-offset…` | `duplicate-and-offset-most-downloaded-fw-utility…md` |
| `http://nathanpitman.com/224/ellipsis-flash-72-updater-out` | `ellipsis-flash-7-2-updater-out.md` |
| `http://nathanpitman.com/611/existing-creative-apps…` | `existing-creative-apps-for-designers…md` |
| `http://nathanpitman.com/files/ext.noscript_messages.php.zip` | `expressionengine-extension-noscript-messages.md` |
| `http://nathanpitman.com/files/np.uk_counties_select_.ff_fieldtype_.zip` | `expressionengine-field-frame…md` |
| `http://nathanpitman.com/journal/539/why-choose-expressionengine'` | `expressionengine-mug.md` |
| `http://nathanpitman.com/files/pi.np_add_vat.php.zip` | `expressionengine-plug-in-add-vat.md` |
| `http://nathanpitman.com/files/pi.np_encodedecode.php.zip` | `expressionengine-plug-in-encode-decode.md` |
| `http://www.nathanpitman.com` | `expressionengine-plug-in-link-target.md` |
| `http://nathanpitman.com/files/pi.np_linktarget.php.zip` | `expressionengine-plug-in-link-target.md` |
| `http://nathanpitman.com/files/pi.np_memberonline.php.zip` | `expressionengine-plug-in-member-online.md` |
| `http://nathanpitman.com/files/pi.np_us_states_select.php.zip` | `expressionengine-plug-in-us-states-select.md` |
| `http://www.nathanpitman.com/babypitman/` | `feeling-urgh.md` |
| `http://nathanpitman.com/169/firefox-09-due…` | `firefox-0-9-due-on-the-12th-with-new-default-theme.md` |
| `http://nathanpitman.com/196/firefox-09-released` | `firefox-0-9-released.md` |
| `http://nathanpitman.com/files/AutoSave.mxp` | `new-fireworks-command-panel-auto-save.md` |
| `http://nathanpitman.com/428/goodbye-macromediacom` | `goodbye-macromedia-com.md` |
| `http://nathanpitman.com/540/google-mail-labels-maxlength40` | `google-mail-labels-maxlength-40.md` |
| `http://nathanpitman.com/520/hacking-expression-engine…` | `hacking-expression-engine…md` |
| `http://nathanpitman.com/journal/397/im-a-dad-again'` | `halfway-between-the-gutter-and-the-stars.md` |
| `http://nathanpitman.com/606/let-devs-prefix…` | `let-devs-prefix-your-expressionengine-variables…md` |
| `http://nathanpitman.com/544/hiding-the-solspace-tag-tab…` | `hiding-the-solspace-tag-tab…md` |
| `http://nathanpitman.com/609/hide-template-based-content…` | `hide-template-based-content…md` |
| `http://nathanpitman.com/463/i` | `i-ay-expression-engine.md` |
| `http://nathanpitman.com/images/uploads/6.jpg` | `im-a-dad.md` |
| `http://nathanpitman.com/journal/147/` | `inevitable.md` |
| `http://nathanpitman.com/archives/` | `inevitable.md` |
| `http://nathanpitman.com/images/uploads/48.jpg` | `ive-got-art-rage.md` |
| `http://nathanpitman.com/108/kleanthis-has-released…` | `kleanthis-has-released…md` |
| `http://nathanpitman.com/journal/12-months-as-a-father` | `let-me-introduce-baby-p-2.md` |
| `http://nathanpitman.com/578/migrating-from-txp-to-ee…` | `migrating-from-txp-to-ee-conclusion.md` |
| `http://ee.nathanpitman.com` | `migrating-from-txp-to-ee-step-1.md` |
| `http://nathanpitman.com/283/mozilla-launches-firefox-10` | `mozilla-launches-firefox-1-0.md` |
| `http://nathanpitman.com/journal/356/xbox-360-unveiled…` | `nintendo-revolution-unveiled.md` |
| `http://nathanpitman.com/115/project-fireworks-release…` | `project-fireworks-release…md` |
| `http://nathanpitman.com/journal/314/re-design-step-2…` | `re-design-step-3-er-start-again.md` |
| `http://nathanpitman.com/archives/2002/03` | `re-writing-history.md` |
| `http://nathanpitman.com/626/safari-on-ios-7…` | `safari-on-ios-7-beta-breaks-the-internet.md` |
| `http://nathanpitman.com/files/search_stop_words.csv` | `search-stop-words.md` |
| `http://nathanpitman.com/235/shauninmancom-pirated` | `shauninman-com-pirated.md` |
| `http://nathanpitman.com/journal/356/` | `sony-playstation-3-unveiled.md` |
| `http://nathanpitman.com/files/FireworksExtensionsSource.zip` | `source-code-for-my-fireworks-extensions.md` |
| `http://nathanpitman.com/313/textpattern-10` | `textpattern-1-0.md` |
| `http://nathanpitman.com/93/the-best-200-i-ever-spent` | `the-best-ps200-i-ever-spent.md` |
| `http://nathanpitman.com/journal/563/kia-sedona-reliability` | `the-faulty-door-on-our-kia-sedona.md` |
| `http://nathanpitman.com/612/things-about-ee-2…` | `things-about-expressionengine-2…md` |
| `http://nathanpitman.com/28/thunderbirds-are-go` | `thunderbird-s-are-go.md` |
| `http://nathanpitman.com/612/things-about-ee-2…` | `things-about-expressionengine-2…md` |
| `http://nathanpitman.com/238/where-is-firefox-10` | `where-is-firefox-1-0.md` |
| `http://nathanpitman.com/files/Calculator.mxp` | `whered-those-fireworks-extensions-go.md` |
| `http://nathanpitman.com/231/yugopcom-v4` | `yugop-com-v4.md` |
