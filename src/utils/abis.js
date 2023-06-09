export const ERC20_ABI = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    "function mint(address to, uint256 amount) public",
  
    // Get the account balance
    "function balanceOf(address) view returns (uint)",
  
    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",
  
    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)",

    "function approve(address spender, uint tokens) public returns (bool success)",

    "function allowance(address owner, address spender) external view returns (uint256)",

    "function convertToFiat(uint256 _amount) external",
    "function conversionFiat(address) public view returns (uint256)",
    "function blacklist(address) public view returns (bool)",
    "function totalSupply() public view returns (uint256)"
];


export const CREDIT_1155_ADDRESS = "0x07D8B5bb7fc6094f52D698AF864CDf7B8c9622eF"