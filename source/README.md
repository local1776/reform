# Working files for reform.local1776.org

Visitors never see this folder. It holds the pieces the live site is built from, so the site can be rebuilt and edited later.

## What is here

- `site/src/`: the page in parts (page body, National Guard and Facts sections, styles, scripts, the timeline data, the list of holes in the law, the playbook, the numbered sources)
- `site/assets/`: the logo and the photos and seals used on the page
- `site/build.py`: joins the parts into one `index.html` (the copy previewed in Claude)
- `site/build_web.py`: makes the public copy from that build. It adds the page title, description, share-preview tags, web address and the share image, and copies in the handout PDFs.
- `handouts/build.py`: generates the four one-page PDF handouts, including their QR codes. Needs the fonts listed in `handouts/package.json` (`npm install`), plus Python with `segno` and `playwright`.
- `tools/gen_doc.py`: regenerates the Chapter 71 audit document from the same data the Holes page uses
- `tools/shot13.py`: a sample screenshot check (desktop and phone)

## How to rebuild

The scripts were written inside a Claude work session and use fixed folder paths that start with `/home/claude/`. To rebuild in a new session, copy `site` to `/home/claude/cbsite` and `handouts` to `/home/claude/handouts`, then run:

1. `python3 /home/claude/handouts/build.py` (only if a handout changed)
2. `python3 /home/claude/cbsite/build.py`
3. `python3 /home/claude/cbsite/build_web.py`

The finished public files land in `/home/claude/web/reform`. Copy them to the top level of this repository and push.

## One thing to remember at launch

`build_web.py` adds a line that tells search engines to skip the site while it is in its feedback period. Remove the `robots` line in that script when the site is ready to be found on Google.
