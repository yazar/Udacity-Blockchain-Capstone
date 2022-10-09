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
import "../../zokrates/code/square/Verifier.sol";

contract SolnSquareVerifier is NipaHutERC721Token {

 struct Solution {
    uint256 tokenIndex;
    address tokenAddress;
  }

  Solution[] solutions;

  mapping(byte32 => Solution) solutionsMap;

  byte32 lastIndex = 0;

  event SolutionAdded(uint256 tokenIndex, address tokenAddress);

  function addSolution(uint256 tokenIndex, address tokenAddress) public {
    Solution newSolution = Solution(tokenIndex, tokenAddress);

    solutions.push(newSolution);
    solutionsMap[lastIndex] = newSolution;
    lastIndex++;

    emit SolutionAdded(tokenIndex, tokenAddress);
  }

  function mintNft(uint256 tokenIndex, address tokenAddress) public returns(bool) {
    require(condition);
    require(!isSolutionExists(tokenIndex, tokenAddress));

    addSolution(tokenIndex, tokenAddress);

    mint(tokenAddress, tokenIndex);
  }

  function isSolutionExists(uint256 tokenIndex, address tokenAddress) returns(bool)
  {

    bool memory solutionState = false;;
    for(uint i = 0; i < lastIndex; i++)
    {
        if(solutionsMap[i].tokenAddress == tokenAddress && solutionsMap[i].tokenIndex == tokenIndex)
        {
            solutionState = true;
        }
    }

    return solutionState;
  }

}

  


























