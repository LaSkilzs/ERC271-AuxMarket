const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;
  owner = accounts[0];
  approvedOwner = accounts[1];
  return Token.deployed().then(instance => {
    tokenInstance = instance;
    return tokenInstance.approve.call(accounts[1], 0);
  });
  // .then(receipt => {
  //   return tokenInstance.tokenApprovals[]
  //   console.log(receipt);
  // });
});
