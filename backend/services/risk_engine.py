import random

def analyze_transaction(sender, receiver, amount):
    """
    Very simple risk engine for mock:
    - Higher amount → higher risk
    - Random variation for demo
    """

    base_risk = 20 if amount < 50 else 50 if amount < 300 else 80
    noise = random.randint(-10, 10)

    score = max(1, min(100, base_risk + noise))

    return score
