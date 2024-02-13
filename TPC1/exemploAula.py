import json
import os

html = '''
"<!DOCTYPE html>"
"<html>"
"<head>"
    "<title>TPC1</title>"
    "<meta charset="utf-8">"
"</head>"
"<body>"
'''

template = html

file = open("../mapa.json", "r", encoding='utf-8').read() # Abre o ficheiro e lê o seu conteúdo
os.mkdir("html") # Cria a pasta html

content = json.loads(file) # Converte o conteúdo do ficheiro para um dicionário

html += "<ul>"

listaCidades = []
for elem in content["cidades"]:
    listaCidades.append(elem['nome'] ) # Adiciona o nome de todas as cidades à lista

    templateCidade = template # Copia o template para a variável templateCidade
    templateCidade += f"<h1>{elem['nome']}</h1>" # Adiciona o nome da cidade ao html
    templateCidade += f"<h3>{elem['distrito']}</h3>" # Adiciona o distrito da cidade ao html
    templateCidade += f"<p> <b> População: </b> {elem['população']} </p>" # Adiciona a população da cidade ao html
    templateCidade += f"<p> <b> Desrição: </b> {elem['descrição']} </p>" # Adiciona a área da cidade ao html
    templateCidade += f"<h6> <a href='../mapaSorted.html'> Voltar ao mapa </a> </h6>"

    fileCidade = open(f"html/{elem['nome']}.html", "w", encoding='utf-8') # Abre o ficheiro para escrita
    fileCidade.write(templateCidade) # Escreve o conteúdo da variável templateCidade no ficheiro
    fileCidade.close() # Fecha o ficheiro

for cidade in sorted(listaCidades):
    html += f"<li><a href='html/{cidade}.html'> {cidade}</a> </li>" # Adiciona cada cidade à lista

html += "</ul>" # Fecha a lista
html += "</body>" # Fecha o corpo
html += "</html>" # Fecha o html

file = open("mapaSorted.html", "w", encoding='utf-8') # Abre o ficheiro para escrita
file.write(html) # Escreve o conteúdo da variável html no ficheiro
file.close() # Fecha o ficheiro