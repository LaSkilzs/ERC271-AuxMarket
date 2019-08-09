const ERC271 = artifacts.require("ERC271");

module.exports = function(deployer) {
  deployer.deploy(ERC271, "Token", "TOK");
};
