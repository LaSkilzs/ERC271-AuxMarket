pragma solidity ^0.5.0;


contract ERC271 {
address public admin;

string public name;
string public symbol;
uint256 public tokenId;
uint256 public totalSupply = 10000000;

mapping(address => uint256) public balanceOf;
mapping(uint256 => address) public ownerOf;

constructor(string memory _name, string memory _symbol) public{
  name = _name;
  symbol = _symbol;
  admin = msg.sender;
  tokenId = 1;
  ownerOf[tokenId] = msg.sender;
  balanceOf[msg.sender] += totalSupply;
}



}
