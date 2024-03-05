import json

def read_json_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data['filmes']

def pertence_ID(lista, valor, campo):
    encontrado = False
    i = 0
    while i < len(lista) and not encontrado:
        if lista[i][campo] == valor:
            encontrado = True
        i += 1
    return encontrado

# esta função é para criar uma lista de filmes únicos a partir do ficheiro json
def calc_filmes(bd):
    filmes = []
    contador = 1
    for registo in bd:
        # se o filme não existir na lista de filmes e o título não for vazio
        if not pertence_ID(filmes, registo['_id']['$oid'], 'id') and registo['_id']['$oid'] != '':
            filmes.append({
                "id": {"$oid": f"f{contador}"},
                "title": registo['title'],
                "year": registo.get('year'),
                "cast": registo.get('cast', []),
                "genres": registo.get('genres', []),
            })
            contador += 1
    return filmes

# esta função é para criar uma lista de atores únicos a partir do ficheiro json
def calc_atores(bd):
    atores = []
    contador = 1
    for registo in bd:
        if registo['cast']:
            for ator in registo['cast']:
                # se o ator não existir na lista de atores
                if not any(a['nome'] == ator for a in atores):
                    atores.append({
                        "id": f"a{contador}",
                        "nome": ator,
                    })
                    contador += 1
    return atores

# esta função é para criar uma lista de géneros únicos a partir do ficheiro json
def calc_generos(bd):
    generos = []
    contador = 1
    for registo in bd:
        genres = registo.get('genres')
        if genres is not None:
            for genre in genres:
                if not pertence_ID(generos, genre, 'name') and genre != '':
                    generos.append({
                        "id": f"g{contador}",
                        "name": genre
                    })
                    contador += 1
    return generos

filename = 'filmes2.json'
bd = read_json_file(filename)
filmes = calc_filmes(bd)
atores = calc_atores(bd)
generos = calc_generos(bd)

novaBD = {
    'filmes': filmes,
    'atores': atores,
    'generos': generos,
}

f = open('novaBD.json', 'w')
json.dump(novaBD, f, indent=2)
f.close()