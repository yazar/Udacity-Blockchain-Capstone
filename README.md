# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 


### Contract Information And Links

Network : Ethereum Goerli Testnet

Contract Address : 0x55064059603706e5E05Ca81c9F12d4f60Af01449

Token Name : Yazar Token

Token Symbol : YRT

Opensea Goerli Storefront : https://testnets.opensea.io/collection/yazar-token

### Contract ABI
you can found it on ```eth-contracts/build/contracts``` folder



### Installing And Testing Steps On Local Network

Open terminal on project folder

```
npm install
```

```
ganache-cli -m "final head into version loyal dinosaur chimney wealth nuclear leave grit enough"
```

Open a new terminal on project folder

```
cd eth-contracts
```

```
truffle compile
```

```
truffle migrate
```

```
truffle test
```

## How to mint on testnet

Create a new proof using ZoKrates

Open AddNewNft.js file and set infuraKey and mnemonic variables.

Open a new terminal on project folder

```
cd eth-contracts
```

```
node AddNewNft.js <tokenID>
```


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
