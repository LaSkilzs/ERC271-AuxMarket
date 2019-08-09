const Token = artifacts.require("ERC271");

contract("ERC271", accounts => {
  let tokenInstance;
  owner = accounts[0];
  approvedOwner = accounts[1];
  it("should approve accounts", () => {
    return Token.deployed()
      .then(instance => {
        tokenInstance = instance;
        return tokenInstance.approve.call(accounts[1], 1);
      })
      .then(success => {
        return tokenInstance.approve(accounts[1], 1);
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, "triggers event");
        assert.equal(
          receipt.logs[0].event,
          "Approval",
          "triggers approval event"
        );
        assert.equal(receipt.logs[0].args._owner, owner, "triggers event");
        assert.equal(
          receipt.logs[0].args._approved,
          approvedOwner,
          "owner not approved"
        );
        assert.equal(
          receipt.logs[0].args._tokenId,
          1,
          "tokenId is not what is expected"
        );
        return tokenInstance.tokenApprovals(1);
      })

      .then(address => {
        assert.equal(address, approvedOwner, "account was not approved");
      });
  });
});
