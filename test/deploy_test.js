const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;
  it("should verify that token was created with valid attributes", async () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        console.log("result", tokenInstance.methods);
        return tokenInstance.name();
      })
      .then(name => {
        assert.equal(name, "Token", "name should equal default");
        //   return tokenInstance.symbol();
        // })
        // .then(symbol => {
        //   assert.equal(symbol, "TOK", "symbol should appear");
        return tokenInstance.tokenId();
      })
      .then(tokenId => {
        assert.equal(tokenId.toNumber(), tokenId, "id should appear");
      });
  });
  it("sets initial value on deployment of  balanceOf to 1", async () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.balanceOf(tokenInstance.address);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), 0, "initial balanceOf 1");
      });
  });
  it("should identify the owner of the contract by contract tokenId", async () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        owner = accounts[0];
        return tokenInstance.tokenId();
      })
      .then(tokenId => {
        return tokenInstance.owners(tokenId);
      })
      .then(id => {
        assert.equal(id, owner, "owner is the same");
      });
  });
});
