import xml.etree.ElementTree as ET
import os

def parse_xml(xml_string):
    # Parse XML with ElementTree
    root = ET.fromstring(xml_string)

    # Create a dictionary to hold the extracted data
    data = {}
    directory = "../MapaRuas-materialBase/"
    # Extract the data
    data['numero'] = root.find('meta/número').text
    data['nome'] = root.find('meta/nome').text
    data['imagens'] = [os.path.join(directory, elem.get('path').lstrip('../')) for elem in root.findall('corpo/figura/imagem')]
    data['legendas'] = [elem.text for elem in root.findall('corpo/figura/legenda')]
    data['corpo'] = [ET.tostring(elem, encoding='unicode', method='text') for elem in root.findall('corpo/para')]
    data['data'] = [elem.text for elem in root.findall('corpo/data')]
    data['entidades'] = [{'tipo': elem.get('tipo'), 'nome': elem.text} for elem in root.findall('corpo/entidade')]
    data['lista-casas'] = [{'numero': (casa.find('número').text if casa.find('número') is not None else None), 'enfiteuta': (casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else None), 'foro': (casa.find('foro').text if casa.find('foro') is not None else None), 'desc': (ET.tostring(casa.find('desc'), encoding='unicode', method='xml') if casa.find('desc') is not None else None)} for casa in root.findall('corpo/lista-casas/casa')]

    return data


if not os.path.exists("./TPC1/html"): # Check if the directory exists before trying to create it
    os.mkdir("./TPC1/html") # Cria a pasta html

main_html = '''
<!DOCTYPE html>
<html>
<head>
    <title>Main Page</title>
    <meta charset="utf-8">
</head>
<body>
<ul>
'''

directory = "./MapaRuas-materialBase/texto"
# Loop over all XML files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".xml"):
        # Read and parse the XML file
        xml_string = open(os.path.join(directory, filename), "r", encoding='utf-8').read()
        data = parse_xml(xml_string)

        # Start the individual HTML string
        html = f'''
                <!DOCTYPE html>
                <html>
                <head>
                    <title>{filename[:-4]}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                '''

        html += f"<h1>{data['nome']}</h1>" # Add the name to the HTML

        # Pair each image with its corresponding legend and add them to the HTML
        for img, leg in zip(data['imagens'], data['legendas']):
            img = img.replace("../MapaRuas-materialBase/", "../../MapaRuas-materialBase/")  # Remove the unnecessary part from the image path
            html += f"<img src='{img}' alt='Imagem' width='1000' height='300'><br>"
            html += f"<p> <b>Legenda:</b> {leg}</p>"

        for para in data['corpo']: # Add each paragraph to the HTML
            html += f"<p>{para}</p>"
        
        # Iterate over the 'casa' elements in the XML data
        for casa in data['lista-casas']:
            # Add the 'casa' data to the HTML
            html += f'''
            <div>
                <h2>Casa {casa['numero']}</h2>
                <p>Enfiteuta: {casa['enfiteuta']}</p>
                <p>Foro: {casa['foro']}</p>
                <p> Descrição: {casa['desc']}</p>
            </div>
            '''

        html += f"<h3> <a href='../output.html'> Voltar </a> </h3>"
        # End the individual HTML
        html += "</body></html>"

        # Write the individual HTML string to a file
        with open(f"./TPC1/html/{data['nome']}.html", "w", encoding='utf-8') as f:
            f.write(html)

        # Add a link to the individual page to the main HTML
        main_html += f"<li><a href='html/{data['nome']}.html'> {data['nome']}</a> </li>"

# End the main HTML
main_html += "</ul></body></html>"

# Write the main HTML string to a file
with open("./TPC1/output.html", "w", encoding='utf-8') as f:
    f.write(main_html)