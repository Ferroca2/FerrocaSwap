// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract EmissorCBIO {
    using SafeERC20 for ERC20;

    ERC20 public cbioToken;
    mapping(address => bool) allowedEmissors;
    mapping(address => uint) cbiosEmited;
    address ownerExchange;

    address emissorAuth = 0xab53369e91dcFC275744DC0A30BD3E363B2785e0;

    constructor(address _cbioToken) {
        cbioToken = ERC20(_cbioToken);
        ownerExchange = msg.sender;
        allowedEmissors[emissorAuth] = true;
    }

    function addEmissor() public {
        if(msg.sender == ownerExchange){
            allowedEmissors[msg.sender] = true;
        }
    }

    function emitCBIO(address _receiver, uint256 _amount) public {
        require(_amount > 0, "EmissorCBIO: amount must be greater than 0");
        require(_amount < cbioToken.balanceOf(address(this)), "EmissorCBIO: amount must be less than the balance of the contract");
        if(allowedEmissors[msg.sender]){
            cbioToken.safeTransfer(_receiver, _amount);
            cbiosEmited[_receiver] += _amount;
        }
    }

    function isAddressAllowed(address _address) public view returns(bool){
        return allowedEmissors[_address];
    }

    function getCBIOSemited(address _address) public view returns(uint){
        return cbiosEmited[_address];
    }
}