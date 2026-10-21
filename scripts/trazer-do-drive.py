"""Baixa as mídias do portfólio a partir da pasta "ARQUIVOS SITE TGT MARKETING" do Google Drive,
converte para WebP (máx. 1600 px, visualmente igual e bem mais leve), salva em public/midia
e troca no código os links antigos do storage do Lovable pelos arquivos locais.

Requer a pasta compartilhada como "Qualquer pessoa com o link" durante a execução.
Uso (na raiz do repositório): python3 scripts/trazer-do-drive.py
"""
import io, json, os, sys, time, urllib.request
from PIL import Image, ImageOps

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MANIFESTO = os.path.join(RAIZ, "scripts", "midia-drive.json")
DESTINO = os.path.join(RAIZ, "public", "midia")
RELATORIO = os.path.join(RAIZ, "scripts", "relatorio-drive.txt")
LADO_MAX = 1600

os.makedirs(DESTINO, exist_ok=True)
itens = json.load(open(MANIFESTO, encoding="utf-8"))


def baixar(file_id):
    url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for tentativa in range(3):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read()
        except Exception:
            if tentativa == 2:
                raise
            time.sleep(3)


ok, falhas, trocas = [], [], {}
for item in itens:
    try:
        dados = baixar(item["drive_id"])
        if dados[:15].lstrip().lower().startswith((b"<!doctype", b"<html")):
            raise RuntimeError("o Drive devolveu uma página em vez do arquivo (pasta ainda restrita?)")
        img = ImageOps.exif_transpose(Image.open(io.BytesIO(dados)))
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        img.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
        caminho = os.path.join(DESTINO, item["destino"])
        img.save(caminho, "WEBP", quality=85, method=6)
        trocas[item["url_antiga"]] = "/midia/" + item["destino"]
        ok.append(f"OK    {item['destino']}  ({len(dados)//1024} KB -> {os.path.getsize(caminho)//1024} KB)")
    except Exception as e:
        falhas.append(f"FALHA {item['titulo_drive']}  ->  {e}")

alterados = 0
for pasta, _, arquivos in os.walk(os.path.join(RAIZ, "src")):
    for nome in arquivos:
        if not nome.endswith((".tsx", ".ts", ".css")):
            continue
        arq = os.path.join(pasta, nome)
        texto = open(arq, encoding="utf-8", newline="").read()
        novo = texto
        for antiga, nova in trocas.items():
            novo = novo.replace(antiga, nova)
        if novo != texto:
            open(arq, "w", encoding="utf-8", newline="").write(novo)
            alterados += 1

resumo = f"total: {len(itens)}  ok: {len(ok)}  falhas: {len(falhas)}  arquivos de código alterados: {alterados}"
open(RELATORIO, "w", encoding="utf-8").write("\n".join([resumo, ""] + falhas + [""] + ok) + "\n")
print(resumo)
for linha in falhas:
    print(linha)
sys.exit(0)
