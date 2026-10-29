#Importa as pastas principais de fastApi e exceção para erros HTTP
from fastapi import FastAPI, HTTPException
#Importa o midlleware de cors para permitir requisições de outros dominios(react)
from fastapi.middleware.cors import CORSMiddleware
#Importa a classe base do python para validação e estruturação e dados
from pydantic import BaseModel
#Importa utilitários de tipagem do python
from typing import Optional, List

#Inicializa a aplicação FastApi definindo o titulo e a versão
app = FastAPI(title="API de Cliente", version='1.0')


#Adiciona o middleware de cors na aplicação para evitar bloqueios de segurança do navegador
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#Define o modelo de dados para criação de um cliente usando Pydantic
#Valida o que chega do FrontEnd
class ClienteCreate(BaseModel):
    nome:str
    email:str
    telefone: Optional[str]=""
    empresa: Optional[str]=""

#Define o modelo completo do cliente herdando de ClienteCreate e adicionando os campos id e ativos
class Cliente(ClienteCreate):
    id: int
    active: bool = True

clients_db: List[Cliente] = [
    Cliente(id=1,nome="Huguinho",email="huguinho@gmail.com",telefone="(11)5555-5555", empresa="Tech Solution",active=True),
    Cliente(id=2,nome="Zezinho",email="zezinho@gmail.com",telefone="(14)5555-5555", empresa="Raiz Copy",active=True)
]

#Define a rota HTTP Get para o endpoint que retorna a lista de clientes
@app.get("/api/clients", response_model=List[Cliente], status_code=200)
def listar_clientes():
    return clients_db

# Compatibilidade com versões anteriores do frontend
@app.get("/api/clients", response_model=List[Cliente], status_code=200)
def listar_clientes_compat():
    return clients_db

@app.post("/api/clientes", response_model=Cliente, status_code=201)
def adicionar_client(client: ClienteCreate):
    novo_id = len(clients_db) + 1

    novo_cliente = Cliente(
        id=novo_id,
        nome=client.nome,
        email=client.email,
        telefone=client.telefone,
        empresa=client.empresa,
        active=True,
    )

    clients_db.append(novo_cliente)

    return novo_cliente

@app.delete("/api/clientes/{cliente_id}", status_code=204)
def remover_cliente(cliente_id: int):
    for idx, cliente in enumerate(clients_db):
        if cliente.id == cliente_id:
            del clients_db[idx]
            return

    raise HTTPException(status_code=404, detail="Cliente não encontrado")

# Compatibilidade com versões anteriores do frontend
@app.delete("/api/cliente/{cliente_id}", status_code=204)
def remover_cliente_compat(cliente_id: int):
    for idx, cliente in enumerate(clients_db):
        if cliente.id == cliente_id:
            del clients_db[idx]
            return

    raise HTTPException(status_code=404, detail="Cliente não encontrado")
