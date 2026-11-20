# Builds the standalone copy for reform.local1776.org (GitHub Pages) from the artifact build.
import pathlib, shutil, base64, asyncio, re
SITE="https://reform.local1776.org/"
root=pathlib.Path(__file__).parent
out=pathlib.Path("/home/claude/web/reform")
if out.exists(): shutil.rmtree(out)
(out/"handouts").mkdir(parents=True)
html=pathlib.Path("/home/claude/cbpage/index.html").read_text(encoding="utf-8")
TITLE="Federal Collective Bargaining Reform | LIUNA Local 1776"
DESC="One signature took bargaining rights from a million federal workers. The record, every hole in the law, and the bill to close them. Published by LIUNA Local 1776."
head='''<title>%s</title>
<meta name="description" content="%s">
<meta name="robots" content="noindex">
<link rel="canonical" href="%s">
<link rel="icon" type="image/png" href="favicon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LIUNA Local 1776">
<meta property="og:title" content="One signature took bargaining rights from a million federal workers">
<meta property="og:description" content="The record, every hole in the federal bargaining law, and the bill to close them.">
<meta property="og:url" content="%s">
<meta property="og:image" content="%sog.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">''' % (TITLE,DESC,SITE,SITE,SITE)
a="<title>Federal Collective Bargaining Reform</title>"
assert html.count(a)==1
html=html.replace(a,head)
(out/"index.html").write_text(html,encoding="utf-8")
for f in (root/"assets"/"handouts").glob("*.pdf"): shutil.copy(f,out/"handouts"/f.name)
(out/"CNAME").write_text("reform.local1776.org\n")
(out/".nojekyll").write_text("")
(out/"README.md").write_text("# Federal Collective Bargaining Reform\n\nPublic site published by LIUNA Local 1776 at https://reform.local1776.org\n\nThe page is one self-contained file, `index.html`. The `handouts` folder holds the printable one-page PDFs.\n")
# share image and favicon
import sys; sys.path.insert(0,"/home/claude/handouts")
nm=pathlib.Path("/home/claude/handouts/node_modules/@fontsource")
def font(fam,rel,w,style="normal"):
    b=base64.b64encode((nm/rel).read_bytes()).decode()
    return "@font-face{font-family:'%s';font-weight:%s;font-style:%s;src:url(data:font/woff2;base64,%s) format('woff2')}"%(fam,w,style,b)
fonts="".join([font("Playfair Display","playfair-display/files/playfair-display-latin-800-normal.woff2",800),font("Source Serif 4","source-serif-4/files/source-serif-4-latin-400-normal.woff2",400),font("Libre Franklin","libre-franklin/files/libre-franklin-latin-700-normal.woff2",700)])
logo="data:image/png;base64,"+base64.b64encode((root/"assets"/"logo.png").read_bytes()).decode()
og='''<!DOCTYPE html><html><head><meta charset="utf-8"><style>%s
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#fff;color:#111;font-family:'Source Serif 4',serif;position:relative;overflow:hidden}
.top{height:14px;background:#0b2a55;border-bottom:4px solid #ff9e0b}
.in{padding:44px 64px 0}
img{height:74px;display:block}
.k{font-family:'Libre Franklin',sans-serif;font-weight:700;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:#b45f00;margin-top:40px}
h1{font-family:'Playfair Display',serif;font-weight:800;font-size:62px;line-height:1.08;margin:12px 0 0;letter-spacing:-.005em}
p{font-size:27px;line-height:1.35;color:#333;margin:20px 0 0;max-width:960px}
.ft{position:absolute;left:64px;right:64px;bottom:34px;border-top:3px solid #0b2a55;padding-top:14px;font-family:'Libre Franklin',sans-serif;font-weight:700;font-size:20px;letter-spacing:.08em;color:#0b2a55;display:flex;justify-content:space-between}
</style></head><body><div class="top"></div><div class="in"><img src="%s"><div class="k">Federal collective bargaining reform</div><h1>One signature took bargaining rights from a million federal workers.</h1><p>The record, every hole in the law, and the bill to close them.</p></div><div class="ft"><span>REFORM.LOCAL1776.ORG</span><span>LIUNA LOCAL 1776</span></div></body></html>'''%(fonts,logo)
fav='''<!DOCTYPE html><html><head><meta charset="utf-8"><style>%s
body{margin:0;width:64px;height:64px;background:#0b2a55;border-top:6px solid #ff9e0b;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:800;font-size:27px;color:#fff;letter-spacing:-.02em}</style></head><body>71</body></html>'''%fonts
pathlib.Path("/tmp/og.html").write_text(og); pathlib.Path("/tmp/fav.html").write_text(fav)
from playwright.async_api import async_playwright
async def shots():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":1200,"height":630}); await pg.goto("file:///tmp/og.html"); await pg.wait_for_timeout(300); await pg.screenshot(path=str(out/"og.png"))
        pg=await b.new_page(viewport={"width":64,"height":64}); await pg.goto("file:///tmp/fav.html"); await pg.wait_for_timeout(200); await pg.screenshot(path=str(out/"favicon.png"))
        await b.close()
asyncio.run(shots())
for f in sorted(out.rglob("*")):
    if f.is_file(): print(f.relative_to(out), f.stat().st_size)
