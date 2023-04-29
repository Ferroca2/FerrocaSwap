// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CBIO is ERC20 {

    constructor() ERC20('Credito de Descarbonizacao','CBIO'){
        _mint(msg.sender, 100000000 ether);
    }

}