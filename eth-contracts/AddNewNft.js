#!/usr/bin/env node
'use strict';

const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraKey = "replace with your infura key";

const mnemonic = "replace with private key";

// Get contract file
const contractFile = require('./build/contracts/SolnSquareVerifier');

const contractAddress = "0x55064059603706e5E05Ca81c9F12d4f60Af01449";

const argv = process.argv.slice(2);
const proof = require("../zokrates/code/square/proof.json");
const tokenId = argv[0];

(async() => {
  const provider = await new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`, 0);
  const web3 = await new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const contract = await new web3.eth.Contract(contractFile.abi, contractAddress, { gasLimit: "4500000" });

  console.log(`Submitting solution:\n- Input: ${proof.inputs}\n- Token ID: ${tokenId}\n- Address: ${accounts[0]}`);

  try {
    let result1 = await contract.methods.addSolution(...Object.values(proof.proof), proof.inputs, accounts[0], tokenId).send({ from: accounts[0], gas: 2500000});
    let result2 = await contract.methods.mintNft(tokenId, accounts[0]).send({ from: accounts[0], gas: 2500000});

    console.log(result1, result2)
  } catch(err) {
    throw (err);
  }

  process.exit(1);
  process.kill(process.pid);
})();