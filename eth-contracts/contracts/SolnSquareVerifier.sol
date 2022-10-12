pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// TODO define a solutions struct that can hold an index & an address
// TODO define an array of the above struct
// TODO define a mapping to store unique solutions submitted
// TODO Create an event to emit when a solution is added
// TODO Create a function to add the solutions to the array and emit the event
// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

import "./ERC721Mintable.sol";
import "./verifier.sol";



contract SolnSquareVerifier is YazarERC721Token {
  
  Verifier squareVerifier;

 struct Solution {
    uint256 tokenIndex;
    address tokenAddress;
    bool minted;
  }

  Solution[] solutions;

  mapping(bytes32 => Solution) solutionsMap;
  mapping(uint256 => Solution) solutionsByIndex;


  event SolutionAdded(uint256 tokenIndex, address tokenAddress);

  function addSolution(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[1] memory input, address accountAddress, uint256 tokenIndex) public {
    
    //require(squareVerifier.verifyTx(a,b,c,input), "solution can not verified");

    bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, input));

    require(solutionsMap[solutionKey].tokenIndex == 0, "solution is used before");


    Solution memory newSolution = Solution(tokenIndex, accountAddress, false);

    solutions.push(newSolution);
    solutionsMap[solutionKey] = newSolution;
    solutionsByIndex[tokenIndex] = newSolution;

    emit SolutionAdded(tokenIndex, accountAddress);
  }

  function mintNft(uint256 tokenIndex, address tokenAddress) public returns(bool) {
    require(solutionsByIndex[tokenIndex].tokenAddress != address(0), "solution for token index not exists");
    require(solutionsByIndex[tokenIndex].minted == false, "token already minted");
    //addSolution(tokenIndex, tokenAddress);

    mint(tokenAddress, tokenIndex);
  }

}

  




