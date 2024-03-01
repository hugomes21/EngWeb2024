import json

f = open('./mapa-virtual.json', 'r')

data = json.load(f)

prehtml_HomePage = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body>
"""

posthtml_HomePage = f"""
    </body>
</html>
"""

prehtml_CityPage = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>{{}}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <p><b>População:</b> {{}}</p>
        <p><b>Descrição:</b> {{}}</p>
        <p><b>Distrito:</b> {{}}</p>
        <ul>
"""
posthtml_CityPage = f"""
        </ul>
        <a href="../"><li>Voltar</li></a>
    </body>
</html>
"""

def getDestinosCidade(id_cidade):
    destinos = []
    for ligacao in data["ligacoes"]:
        if ligacao["origem"] == id_cidade:
            destinos.append(ligacao["destino"])
    return destinos

def getNomeCidade(id_cidade):
    for cidade in data["cidades"]:
        if cidade["id"] == id_cidade:
            return cidade["nome"]
    return None

def ligacoes(id_cidade):
    html = ""
    ids_destinos = getDestinosCidade(id_cidade)
    for id_destino in ids_destinos:
        nome = getNomeCidade(id_destino)  # Esta função precisa ser definida
        if nome is not None:
            html += f"<a href='{id_destino}'><li>{nome}</li></a>"
    return html

cidades = ""
for linha in sorted(data["cidades"], key=lambda cidade: cidade["nome"]):
    cidades += f"<a href='{linha['id']}'><li>{linha['nome']}</li></a>"
    html = prehtml_CityPage.format(linha["nome"], linha["população"], linha["descrição"], linha["distrito"])
    html += ligacoes(linha["id"])
    html += posthtml_CityPage
    f= open(f"cities/{linha['id']}.html","w+")
    f.write(html)
    f.close()
cidades = f"<ul>{cidades}</ul>"

html = prehtml_HomePage + cidades + posthtml_HomePage
f= open("cities/mainPage.html","w+")
f.write(html)
f.close()
