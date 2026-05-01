@app.get("/api/saldo/{usuario}")
def obtener_saldo(usuario: str):
    user = usuarios.get(usuario)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"saldo": user["saldo"]}


@app.post("/api/depositar")
def depositar(data: MontoRequest):
    user = usuarios.get(data.usuario)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if data.monto <= 0:
        raise HTTPException(status_code=400, detail="Monto inválido")

    user["saldo"] += data.monto
    user["historial"].append({"tipo": "DEPÓSITO", "monto": data.monto})
    return {"mensaje": "Depósito exitoso", "saldo": user["saldo"]}


@app.post("/api/retirar")
def retirar(data: MontoRequest):
    user = usuarios.get(data.usuario)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if data.monto <= 0:
        raise HTTPException(status_code=400, detail="Monto inválido")
    if data.monto > user["saldo"]:
        raise HTTPException(status_code=400, detail="Fondos insuficientes")

    user["saldo"] -= data.monto
    user["historial"].append({"tipo": "RETIRO", "monto": data.monto})
    return {"mensaje": "Retiro exitoso", "saldo": user["saldo"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)