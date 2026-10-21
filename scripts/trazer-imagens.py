"""Baixa as imagens/vídeos hospedados no storage do Lovable para public/midia e reescreve os src.
Uso (na raiz do repositório): python3 -I scripts/trazer-imagens.py .
"""
import os, re, sys, urllib.parse, urllib.request, ssl, hashlib

root = sys.argv[1]
src_dir = os.path.join(root, "src")
dest_dir = os.path.join(root, "public", "midia")
os.makedirs(dest_dir, exist_ok=True)
pat = re.compile(r'https://cvbgrjauqjawrsyknhyj\.supabase\.co/storage/v1/object/public/files/uploads/[^"`\'\s)]+')
ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or "/root/.ccr/ca-bundle.crt")
proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
opener = urllib.request.build_opener(urllib.request.ProxyHandler({"https": proxy} if proxy else {}), urllib.request.HTTPSHandler(context=ctx))

files = []
for dp, _, fns in os.walk(src_dir):
    for fn in fns:
        if fn.endswith((".tsx", ".ts", ".css")):
            files.append(os.path.join(dp, fn))

urls = set()
for f in files:
    urls.update(pat.findall(open(f, encoding="utf-8").read()))

mapping, falhas = {}, []
for url in sorted(urls):
    nome = urllib.parse.unquote(url.rsplit("/", 1)[-1])
    base, ext = os.path.splitext(nome)
    seguro = re.sub(r"[^A-Za-z0-9._-]+", "-", base).strip("-")[:80] or hashlib.md5(url.encode()).hexdigest()[:10]
    final = f"{seguro}{ext.lower()}"
    caminho = os.path.join(dest_dir, final)
    if not os.path.exists(caminho) or os.path.getsize(caminho) == 0:
        try:
            with opener.open(url, timeout=60) as r, open(caminho, "wb") as out:
                out.write(r.read())
        except Exception as e:
            falhas.append((url, str(e)))
            continue
    mapping[url] = "/midia/" + final

for f in files:
    s = open(f, encoding="utf-8").read()
    novo = s
    for url, local in mapping.items():
        novo = novo.replace(url, local)
    if novo != s:
        open(f, "w", encoding="utf-8").write(novo)

print(f"encontradas: {len(urls)}  baixadas: {len(mapping)}  falhas: {len(falhas)}")
for u, e in falhas[:10]:
    print("FALHA", u[-60:], e)
