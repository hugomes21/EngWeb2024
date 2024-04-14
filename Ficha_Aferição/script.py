import json
import requests

extraDatasetsPaths = [
    "dataset-extra1.json",
    "dataset-extra2.json",
    "dataset-extra3.json"
]

api = "http://localhost:3000/users"

for path in extraDatasetsPaths:
    with open(path, "r") as f:
        data = json.load(f)

        for data in data:            
            response = requests.post(api, json=data, headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                print("Dados enviados com sucesso!\n")
            else:
                print("Erro! Código: ", response.status_code)