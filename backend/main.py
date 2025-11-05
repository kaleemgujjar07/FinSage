from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.arc_service import get_usdc_balance, send_usdc_from_custodial

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # restrict to your frontend dev URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "backend running"}

@app.get("/arc/balance/{addr}")
def balance(addr: str):
    try:
        bal = get_usdc_balance(addr)
        return {"address": addr, "balance": bal}
    except Exception as e:
        return {"error": str(e)}

@app.post("/arc/send-custodial")
def send_custodial(to: str, amount: float):
    try:
        tx = send_usdc_from_custodial(to, amount)
        return {"tx": tx}
    except Exception as e:
        return {"error": str(e)}
