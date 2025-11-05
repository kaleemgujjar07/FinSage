import requests
from config import CIRCLE_API_KEY, BASE_URL

HEADERS = {
    "Authorization": f"Bearer {CIRCLE_API_KEY}",
    "Content-Type": "application/json",
}

# ---------------------------------------------------
# ✅ SEND USDC
# ---------------------------------------------------
def send_usdc(wallet_id: str, destination: str, amount: float):
    payload = {
        "walletId": wallet_id,
        "amount": {
            "amount": str(amount),
            "currency": "USD"
        },
        "destinationAddress": destination,
        "chain": "ARC-TESTNET"
    }

    try:
        res = requests.post(f"{BASE_URL}/transfers", json=payload, headers=HEADERS)
        return res.json()
    except Exception as e:
        return {"error": str(e)}
