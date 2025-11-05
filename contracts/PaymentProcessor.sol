// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUSDC {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract PaymentProcessor {
    function pay(address usdc, address to, uint256 amount) external {
        IUSDC(usdc).transferFrom(msg.sender, to, amount);
    }
}
clea