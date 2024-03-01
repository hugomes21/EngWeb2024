# Aula prática 3

import csv
import json

def read_csv_file(file_path):
    bd = []
    try: 
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file, delimiter=';')
            for row in reader:
                bd.append(row)
    except FileNotFoundError:
        print(f'File {file_path} not found')
    except Exception as e:
        print(f'Error reading file {file_path}: {e}')
    return bd

def pertence_especie(lista, valor):
    encontrado = False
    i = 0
    while i < len(lista) and not encontrado:
        if lista[i]['designacao'] == valor:
            encontrado = True
        i += 1
    return encontrado

def calc_especies(bd):
    especies = []
    contador = 1
    for registo in bd:
        if not pertence_especie(especies, registo['BreedIDDesc']) and registo['BreedIDDesc'] != '':
            especies.append({
                "id": f"e{contador}",
                "designacao": registo['BreedIDDesc'],
            })
            contador += 1
    return especies

def calc_animais(bd):
    animais = []
    contador = 1
    for registo in bd:
        if not pertence_especie(animais, registo['SpeciesIDDesc']) and registo['SpeciesIDDesc'] != '':
            animais.append({
                "id": f"a{contador}",
                "designacao": registo['SpeciesIDDesc'],
            })
            contador += 1
    return animais

file_path = 'Health_AnimalBites.csv'
bd = read_csv_file(file_path)
especies = calc_especies(bd)
animais = calc_animais(bd)

novaBD = {
    'ocorrencias': bd,
    'especies': especies,
    'animais': animais,
}

f = open('mordidas.json', 'w')
json.dump(novaBD, f, indent=2)
f.close()