const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;
  it("approves safe transfer from owner", () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        currentOwner = accounts[0];
        newOwner = accounts[1];
        exchangeOwner = accounts[2];
        console.log(tokenInstance);
      })
      .then(account => {
        console.log(account);
      });
  });
});
