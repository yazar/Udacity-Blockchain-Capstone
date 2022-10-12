var ERC721MintableComplete = artifacts.require('YazarERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, {from: account_one});
            await this.contract.mint(account_two, 2, {from: account_one});
            await this.contract.mint(account_two, 3, {from: account_one});
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call();
            assert.equal(3, result);
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(account_one);
            assert.equal(1, result);

            result = await this.contract.balanceOf(account_two);
            assert.equal(2, result);
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI(1);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", result);
        })

        it('should transfer token from one owner to another', async function () { 

            let result = await this.contract.ownerOf((2));
            assert.equal(account_two, result);

            await this.contract.transferFrom(account_two, account_one, 2, {from: account_two});
    
            result = await this.contract.ownerOf((2));
            assert.equal(account_one, result);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
              } catch(err) {
                assert.equal(err.reason, "Only available for owner");
              }
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.owner();
            assert.equal(account_one, result);
        })

    });
})