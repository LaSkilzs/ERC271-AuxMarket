const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;
  it("should verify that token was created with valid attributes", async () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(name => {
        assert.equal(name, "Token", "name should equal default");
        return tokenInstance.symbol();
      })
      .then(symbol => {
        assert.equal(symbol, "TOK", "symbol should appear");
        return tokenInstance.totalSupply();
      })
      .then(tokens => {
        assert.equal(tokens.toNumber(), 10000000, "tokens should equal 1");
      });
  });
  it("sets admin balanceOf to totalSupply count of 1000000", async () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), 10000000, "initial balanceOf 1");
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
        return tokenInstance.ownerOf(tokenId);
      })
      .then(id => {
        assert.equal(id, owner, "owner is the same");
      });
  });
});
