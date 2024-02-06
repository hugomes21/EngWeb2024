import os

# Mudar de diretoria
#os.chdir('./EngWeb2024')

# Criar 8 Pastas TPC's (TPC1, TPC2, TPC3, TPC4, TPC5, TPC6, TPC7, TPC8)
# Em cada pasta (TPC) criar um ficheiro .gitkeep
for i in range(1, 9):
    nomePasta = f"TPC{i}"
    os.mkdir(nomePasta)
    open(f"{nomePasta}/.gitkeep", "w").close()

# Cria a pasta "Projeto"
os.mkdir("Projeto")
open("Projeto/.gitkeep", "w").close()

# Cria a pasta "Teste"
os.mkdir("Teste")
open("Teste/.gitkeep", "w").close()


