// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('./SolnSquareVerifier.sol');
var SquareVerifier = artifacts.require('verifier');
const zokratesProof = require("../../zokrates/code/square/proof.json");


contract("TestSolnSquareVerifier", accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const tokenID = 1;
    const { proof: { a, b, c }, inputs: input } = zokratesProof;
  
    beforeEach(async() => {
      let squareVerifierContract = await SquareVerifier.new({from: account_one});
      this.contract = await SolnSquareVerifier.new(squareVerifierContract.address, {from: account_one});
    });
  
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("add new solution", async() => {
      let result = false;
  
      try {
        await this.contract.addSolution(a, b, c, input , account_two, tokenID , { from: account_two });
        result = true;
      } 
      catch(e) {
        console.log(e);
        result = false;
      }
      assert.equal(result, true);

    });
  
    it("dont use same proof", async() => {
      let result = false;
  
      try {
        await this.contract.addSolution(a,b,c, input, account_two, tokenID , { from: account_two });
        await this.contract.addSolution(a,b,c, input, account_two, tokenID , { from: account_two });
        result = true;
      } catch(e) {
        result = false;
      }
      assert.equal(result, false);
    });
  
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("mint new token", async() => {
      let result = false;
      try {
        await this.contract.addSolution(a,b,c, input, account_two, tokenID, { from: account_two });
        await this.contract.mintNft(tokenID, account_two, { from: account_one });
        result = true
      } catch(e) {
        console.log(false);
        result = false;
      }
      assert.equal(result, true);
    });
  });
