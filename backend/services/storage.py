# backend/services/storage.py
import json
import os

DATA_DIR = "data"
WALLETS_FILE = os.path.join(DATA_DIR, "wallets.json")
TX_FILE = os.path.join(DATA_DIR, "transactions.json")

def init_files():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not os.path.exists(WALLETS_FILE):
        with open(WALLETS_FILE, "w") as f:
            json.dump({}, f)
    if not os.path.exists(TX_FILE):
        with open(TX_FILE, "w") as f:
            json.dump([], f)

def load_wallets():
    init_files()
    with open(WALLETS_FILE, "r") as f:
        return json.load(f)

def save_wallets(data):
    init_files()
    with open(WALLETS_FILE, "w") as f:
        json.dump(data, f, indent=2)

def save_wallet(user_id, wallet_id, address_or_balance="N/A"):
    wallets = load_wallets()
    wallets[user_id] = {
        "walletId": wallet_id,
        "address_or_balance": address_or_balance
    }
    save_wallets(wallets)

def load_transactions():
    init_files()
    with open(TX_FILE, "r") as f:
        return json.load(f)

def save_transaction(tx):
    txs = load_transactions()
    txs.append(tx)
    with open(TX_FILE, "w") as f:
        json.dump(txs, f, indent=2)
