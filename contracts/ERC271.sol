pragma solidity ^0.5.0;


contract ERC271 {

string public name;
string public symbol;
uint256 public tokenId;

mapping(address=> uint) public balanceOf;
mapping(uint256 => address) public owners;

constructor(string memory _name, string memory _symbol, uint256 _tokenId) public{
  name = _name;
  symbol = _symbol;
  tokenId = _tokenId;
  balanceOf[msg.sender] += 1;
  owners[tokenId] = msg.sender;
}



}
