import uuid
import requests
from config import CIRCLE_API_KEY, BASE_URL, WALLET_SET_ID
from services.storage import save_wallet

HEADERS = {
    "Authorization": f"Bearer {CIRCLE_API_KEY}",
    "Content-Type": "application/json",
}


# ---------------------------------------------------
# ✅ CREATE WALLET
# ---------------------------------------------------
def create_wallet(user_id: str):
    payload = {
        "idempotencyKey": str(uuid.uuid4()),
        "walletSetId": WALLET_SET_ID,
        "entitySecretCiphertext": "dGVzdC1zZWNyZXQ=",  # mock secret
        "blockchains": ["ARC-TESTNET"]
    }

    # Mock mode
    if "mock" in BASE_URL:
        wallet_id = f"mock-wallet-{uuid.uuid4().hex[:6]}"
        save_wallet(user_id, wallet_id, "N/A")
        return {"message": "✅ Wallet created successfully (mock)", "walletId": wallet_id}

    try:
        res = requests.post(f"{BASE_URL}/wallets", json=payload, headers=HEADERS)
        data = res.json()

        if res.status_code == 200 and "data" in data:
            wallet_id = data["data"]["walletId"]
            save_wallet(user_id, wallet_id, "N/A")
            return {"message": "✅ Wallet created successfully", "walletId": wallet_id}
        else:
            return {"error": data}
    except Exception as e:
        return {"error": str(e)}


# ---------------------------------------------------
# ✅ GET WALLET BALANCE
# ---------------------------------------------------
def get_wallet_balance(wallet_id: str):
    if "mock" in BASE_URL:
        # Return fake balances
        return {
            "walletId": wallet_id,
            "balances": [
                {"currency": "USDC", "amount": "1234.56"},
                {"currency": "ETH", "amount": "0.42"}
            ]
        }

    try:
        res = requests.get(f"{BASE_URL}/wallets/{wallet_id}/balances", headers=HEADERS)
        return res.json()
    except Exception as e:
        return {"error": str(e)}


# ---------------------------------------------------
# ✅ SEND USDC
# ---------------------------------------------------
def send_usdc(wallet_id: str, destination: str, amount: str):
    # Mock Mode
    if "mock" in BASE_URL:
        return {
            "status": "✅ Success (mock)",
            "from": wallet_id,
            "to": destination,
            "amount": amount,
            "currency": "USDC",
            "txId": f"mock-tx-{uuid.uuid4().hex[:8]}"
        }

    payload = {
        "walletId": wallet_id,
        "amount": {"amount": amount, "currency": "USD"},
        "destinationAddress": destination,
        "chain": "ARC-TESTNET"
    }

    try:
        res = requests.post(f"{BASE_URL}/transfers", json=payload, headers=HEADERS)
        return res.json()
    except Exception as e:
        return {"error": str(e)}
