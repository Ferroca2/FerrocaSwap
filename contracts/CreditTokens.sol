// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreditTokens is ERC1155, ERC1155Supply, Ownable {

    event TokenCreated(uint tokenId, string name, address tokenOwner);
    event TokenPriceSet(uint tokenId, uint price);
    event TokenSale(uint tokenId, uint amount, address buyer);


    mapping (uint => string) public tokenNames;
    mapping (uint => uint) public tokenPrices;
    mapping (uint => address) public tokenOwners;
    uint public tokenCount;

    IERC20 public currencyToken;

    constructor() ERC1155("Carbon CreditTokens") {}

    function createToken(string memory name, address tokenOwner) public onlyOwner returns (uint) {
        tokenCount++;
        tokenNames[tokenCount] = name;
        tokenOwners[tokenCount] = tokenOwner;

        emit TokenCreated(tokenCount, name, tokenOwner);
        return tokenCount;
    }

    function getTokenName(uint tokenId) public view returns (string memory) {
        return tokenNames[tokenId];
    }

    function setCurrencyToken(address _currencyToken) public onlyOwner {
        currencyToken = IERC20(_currencyToken);
    }

    function setTokenPRice(uint tokenId, uint price) public onlyOwner {
        tokenPrices[tokenId] = price;
    }

    function buyToken(uint tokenId, uint amount) public {
        require(tokenPrices[tokenId] > 0, "Token not for sale");
        require(amount > 0, "Must buy at least one token");
        require(currencyToken.balanceOf(msg.sender) >= tokenPrices[tokenId] * amount, "Insufficient funds");
        currencyToken.transferFrom(msg.sender, tokenOwners[tokenId], tokenPrices[tokenId] * amount);

        emit TokenSale(tokenId, amount, msg.sender);
        _safeTransferFrom(tokenOwners[tokenId], msg.sender, tokenId, amount, "");

    }


    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override (ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }


    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);

    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}