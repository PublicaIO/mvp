const assert = require('assert');
const Web3 = require('web3');

const web3 = new Web3();
web3.setProvider('http://localhost:8545');

const DataContract = require('../build/contracts/Data.json');

describe('DataContract', () => {
    const oracle = '0xc03450e0909492d197323ba3dcb0d0ad763457c3';

    // Deploy new contract before every test
    beforeEach(async () => {
        const contract = new web3.eth.Contract(DataContract.abi);

        dataInstance = await contract.deploy({
            data: DataContract.bytecode
        })
        .send({
            from: oracle,
            gas: 6500000
        });
    });

    it('has instance deployed', async () => {        
        assert.equal(true, typeof dataInstance._address === 'string')
    })
});
