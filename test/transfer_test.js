const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;

  it("should allow accounts to transfer", () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        fromAccount = accounts[0];
        toAccount = accounts[1];
        return tokenInstance.transferFrom(fromAccount, toAccount, 1, {
          from: fromAccount
        });
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, "triggers event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          "triggers approval event"
        );
        assert.equal(receipt.logs[0].args._from, fromAccount, "triggers event");
        assert.equal(receipt.logs[0].args._to, toAccount, "owner not approved");
        assert.equal(
          receipt.logs[0].args._tokenId,
          1,
          "tokenId is not what is expected"
        );
        return tokenInstance.balanceOf(fromAccount);
      })
      .then(balance => {
        assert.equal(
          balance.toNumber(),
          9999999,
          "account balance of from account is 0"
        );
        return tokenInstance.balanceOf(toAccount);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), 1, "balance of to account is 1");
      });
  });
});
