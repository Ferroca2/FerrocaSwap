//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonTokensERC20 is ERC20, Ownable{

    constructor(string memory name, string memory ticker) ERC20(name, ticker) {

        _mint(msg.sender, 5 ether);
        
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}


