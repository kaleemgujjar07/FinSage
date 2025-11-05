import os
from dotenv import load_dotenv
load_dotenv()

CIRCLE_API_KEY = os.getenv("CIRCLE_API_KEY")
CIRCLE_WALLET_URL = os.getenv("CIRCLE_WALLET_URL", "https://api.circle.com/v1/w3s")
WALLET_SET_ID = os.getenv("WALLET_SET_ID")

ARC_CHAIN_ID = int(os.getenv("ARC_CHAIN_ID", "31337"))
ARC_RPC_URL = os.getenv("ARC_RPC_URL", "https://rpc-test-1.archiechain.io")
USDC_CONTRACT_ADDRESS = os.getenv("USDC_CONTRACT_ADDRESS")
