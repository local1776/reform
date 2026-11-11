import base64, pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
rd = lambda n: (src / n).read_text(encoding="utf-8")
logo = "data:image/png;base64," + base64.b64encode((root / "assets" / "logo.png").read_bytes()).decode()
body = rd("body.html").replace("{{TL_PIN}}", rd("tl_pin.html")).replace("{{TL_MAIN}}", rd("tl_main.html")).replace("{{LOGO}}", logo).replace("{{FACTS}}", rd("facts.html")).replace("{{GUARD}}", rd("guard.html"))
html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Federal Collective Bargaining Reform</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Libre+Franklin:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>%s
%s</style>
</head>
<body>

%s

<script>%s</script>
<script>%s</script>
<script>%s</script>
</body>
</html>
""" % (rd("timeline.css"), rd("page.css") + rd("extra.css"), body, rd("sources.js") + "\n" + rd("timeline.js"), rd("extra.js"), rd("page.js").replace("/*AUDIT*/[]", rd("audit.json")).replace("/*PLAY*/[]", rd("playbook.json")))
import re
def _img(m):
    n=m.group(1)
    for ext,mime in (("jpg","image/jpeg"),("png","image/png")):
        f=root/"assets"/"img"/(n+"."+ext)
        if f.exists(): return "data:%s;base64,%s" % (mime, base64.b64encode(f.read_bytes()).decode())
    raise SystemExit("missing image "+n)
html=re.sub(r"\{\{IMG:([a-z0-9_]+)\}\}",_img,html)
html=re.sub(r"\[\[fn:([a-z0-9_,]+)\]\]",lambda m:"".join('<sup class="fn" data-k="%s"></sup>'%k for k in m.group(1).split(",")),html)
out = pathlib.Path("/home/claude/cbpage/index.html")
out.write_text(html, encoding="utf-8")
print("built", len(html))
