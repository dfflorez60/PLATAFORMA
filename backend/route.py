from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pathlib import Path
import uvicorn

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
# ---------------------------
# FRONTEND (html, css, js)
# ---------------------------

app.mount("/static", StaticFiles(directory=BASE_DIR / "frontend"), name="static")

@app.get("/")
def serve_frontend():
    return FileResponse(BASE_DIR / "frontend" / "index.html")


# ---------------------------
# MODELOS DE DATOS
# ---------------------------

class RegisterRequest(BaseModel):
    nombre: str
    correo: str
    programa: str


class EventRequest(BaseModel):
    titulo: str
    fecha: str
    lugar: str


class NewsRequest(BaseModel):
    titulo: str
    contenido: str

usuarios = []
eventos = []
noticias = []


# ----------
# ENDPOINTS 
# ----------

# ---------- AUTH ----------

@app.post("/api/auth/register")
def register(data: RegisterRequest):
    usuarios.append(data.dict())
    return {"message": "Usuario registrado", "data": data}


# ---------- EVENTS ----------

@app.get("/api/events")
def get_events():
    return eventos


@app.post("/api/events")
def create_event(data: EventRequest):
    eventos.append(data.dict())
    return {"message": "Evento creado", "data": data}


# ---------- NEWS ----------

@app.get("/api/news")
def get_news():
    return noticias


@app.post("/api/news")
def create_news(data: NewsRequest):
    noticias.append(data.dict())
    return {"message": "Noticia creada", "data": data}


