from web3 import Web3
from config import ARC_RPC_URL, ARC_CHAIN_ID, USDC_CONTRACT_ADDRESS, CUSTODIAL_PRIVATE_KEY

w3 = Web3(Web3.HTTPProvider(ARC_RPC_URL))

# Minimal ERC20 ABI for balanceOf and transfer
USDC_ABI = [
    {"constant": True, "inputs":[{"name":"owner","type":"address"}], "name":"balanceOf", "outputs":[{"name":"","type":"uint256"}], "type":"function"},
    {"constant": False, "inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}], "name":"transfer", "outputs":[{"name":"","type":"bool"}], "type":"function"},
]

usdc = w3.eth.contract(address=Web3.toChecksumAddress(USDC_CONTRACT_ADDRESS), abi=USDC_ABI)

DECIMALS = 6  # typical for USDC

def get_usdc_balance(address: str):
    checksum = Web3.toChecksumAddress(address)
    raw = usdc.functions.balanceOf(checksum).call()
    return raw / (10 ** DECIMALS)

def send_usdc_from_custodial(to_address: str, amount_usdc: float):
    if not CUSTODIAL_PRIVATE_KEY:
        raise Exception("No custodial private key configured.")
    acct = w3.eth.account.from_key(CUSTODIAL_PRIVATE_KEY)
    from_addr = acct.address
    to = Web3.toChecksumAddress(to_address)
    amount_raw = int(amount_usdc * (10 ** DECIMALS))
    nonce = w3.eth.get_transaction_count(from_addr)
    tx = usdc.functions.transfer(to, amount_raw).buildTransaction({
        "chainId": ARC_CHAIN_ID,
        "gas": 200000,
        "gasPrice": w3.toWei("1", "gwei"),
        "nonce": nonce,
    })
    signed = w3.eth.account.sign_transaction(tx, CUSTODIAL_PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
    return w3.toHex(tx_hash)
