pragma solidity ^0.5.0;

contract ERC271 {
  address public admin;

  string public name;
  string public symbol;
  uint256 public tokenId;
  uint256[] internal allTokens;
  uint256 public totalSupply = 10000000;

  mapping(address => uint256) public balanceOf; // find token balance by address of owner
  mapping(uint256 => address) public ownerOf;  // find address of tokenOwner by tokenId
  mapping(address => uint256[]) internal ownedTokens;  // who owns what token by address

  mapping(uint256 => address) public tokenApprovals; // address of users approved token use
  mapping(address =>  mapping(address => bool)) internal _operatorApprovals; //owner to operator approvals

  constructor(string memory _name, string memory _symbol) public{
    name = _name;
    symbol = _symbol;
    admin = msg.sender;
    tokenId += 1;
    ownerOf[tokenId] = msg.sender;
    balanceOf[msg.sender] += totalSupply;
  }

  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event ApprovalForAll(address indexed _sender, address indexed _to, bool _result);

  function approve(address _approved, uint256 _tokenId) external payable {
    address owner = ownerOf[_tokenId];
    require(owner != _approved, 'owner cannot be the approved address');
    tokenApprovals[_tokenId] = _approved;
    emit Approval(owner, _approved, _tokenId);
  }

  function setApprovalForAll(address _to, bool approved) public {
    require(_to != msg.sender, 'sender and recipient can not be the same');
    _operatorApprovals[msg.sender][_to];
    emit ApprovalForAll(msg.sender, _to, approved);
  }

  function isApprovedForAll(address owner, address operator) public view returns(bool){
    // return _operatorApprovals[owner][operator];
  }

  function getApproved(uint256 _tokenId) public view returns(address){
    require(_tokenId != 0, 'a tokenId must exist');
    return tokenApprovals[tokenId];
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require(_to != address(0), 'must be a valid address to send to');
    require(_from != _to, 'can not transfer token to same address');
    require(ownerOf[_tokenId] != address(0), 'sender must be approved');
    ownerOf[_tokenId] = _to;
    balanceOf[_to] += 1;
    balanceOf[_from] -= 1;
    emit Transfer(_from, _to, _tokenId);
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external payable{
    // transferFrom(_from, _to, _tokenId);
   
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable{
    // transferFrom(_from, _to, _tokenId);
  }


}
