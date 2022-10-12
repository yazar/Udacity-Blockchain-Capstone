// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var YazarERC721Token = artifacts.require("./YazarERC721Token.sol");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(YazarERC721Token);
};
