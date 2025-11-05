import uuid
import requests
from config import CIRCLE_API_KEY, BASE_URL, WALLET_SET_ID
from services.storage import save_wallet

HEADERS = {
    "Authorization": f"Bearer {CIRCLE_API_KEY}",
    "Content-Type": "application/json",
    "X-User-Id": "developer"
}

# ---------------------------------------------------
# ✅ CREATE WALLET
# ---------------------------------------------------
def create_wallet(user_id: str):
    payload = {
        "idempotencyKey": str(uuid.uuid4()),
        "walletSetId": WALLET_SET_ID,
        "entitySecretCiphertext": "dGVzdC1zZWNyZXQ=",
        "blockchains": ["ARC-TESTNET"]
    }

    res = requests.post(f"{BASE_URL}/wallets", json=payload, headers=HEADERS)
    data = res.json()

    if "data" in data:
        wallet_id = data["data"]["walletId"]

        save_wallet(user_id, wallet_id, "N/A")

        return {
            "message": "✅ Wallet created successfully",
            "walletId": wallet_id
        }

    return data


# ---------------------------------------------------
# ✅ GET WALLET BALANCE
# ---------------------------------------------------
def get_wallet_balance(wallet_id: str):
    res = requests.get(f"{BASE_URL}/wallets/{wallet_id}/balances", headers=HEADERS)
    return res.json()


# ---------------------------------------------------
# ✅ SEND USDC
# ---------------------------------------------------
def send_usdc(wallet_id: str, destination: str, amount: str):
    payload = {
        "walletId": wallet_id,
        "amount": {
            "amount": amount,
            "currency": "USD"
        },
        "destinationAddress": destination,
        "chain": "ARC-TESTNET"
    }

    res = requests.post(f"{BASE_URL}/transfers", json=payload, headers=HEADERS)
    return res.json()
