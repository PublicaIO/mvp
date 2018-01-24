const assert = require('assert');
const Web3 = require('web3');

var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://blockchain:8545'));
const gasLimit = 6500000;

const DataContract = require('../build/contracts/Data.json');

const prepareTestData = (test) => {
    return {
        code: web3.utils.stringToHex(test.code),
        rate: web3.utils.toWei(test.rate),
        amount: web3.utils.toWei(test.amount)
    }
}

describe('DataContract', () => {
    beforeEach(async () => {
        // Setup accounts
        accounts = await web3.eth.getAccounts();
        oracle = accounts[0];
        account = accounts[1];

        // Deploy new contract and unlock oracle account before every test
        const contract = new web3.eth.Contract(DataContract.abi);
        await web3.eth.personal.unlockAccount(oracle, '');
        dataInstance = await contract.deploy({
            data: DataContract.bytecode
        })
        .send({
            from: oracle,
            gas: gasLimit
        });

        dataInstance.setProvider(web3.currentProvider);
    });

    it('instance can be deployed', async () => {
        assert.equal(true, typeof dataInstance._address === 'string')
    })

    it('expected owner is set', async () => {
        assert.equal(
            web3.utils.toChecksumAddress(oracle),
            web3.utils.toChecksumAddress(await dataInstance.methods.owner().call())
        );
    })

    // Tests data
    const tests = [
        { rate: '999999999999999999', code: 'USD', amount: '4' },
        { rate: '0.8345', code: 'EUR', amount: '4.5' }
    ];

    tests.forEach(test => {
        const data = prepareTestData(test);

        it(`can update "${test.code}" currency rate to "${test.rate}" form oracle account`, async () => {
            // Wait for transaction to be mined
            await dataInstance.methods.updateRate(data.code, data.rate).send(
                { from: oracle, gas: gasLimit }
            );

            // Make sure that contract has correct rate set
            assert.equal(data.rate, await dataInstance.methods.rates(data.code).call());
        })

        it(`unable to update "${test.code}" currency rate from non oracle account`, async () => {
            // When contract is just deployed - rate should be 0
            const currentRate = await dataInstance.methods.rates(data.code).call();
            assert.equal(currentRate, 0);

            await web3.eth.personal.unlockAccount(account, '');
            await dataInstance.methods.updateRate(data.code, data.rate).send(
                { from: account, gas: gasLimit }
            );

            // Make sure that rate was not updated
            assert.notEqual(data.rate, await dataInstance.methods.rates(data.code).call());
        })

        it(`can correctly convert amount of ${test.amount} "${test.code}" => "PBL" using rate "${test.rate}"`, async () => {
            await dataInstance.methods.updateRate(data.code, data.rate).send(
                { from: oracle, gas: gasLimit }
            );

            const convertedInContract = await dataInstance.methods.convert(data.code, data.amount).call();
            const convertedInTest = web3.utils.fromWei(
                web3.utils.toBN(data.amount).mul(web3.utils.toBN(data.rate)).toString()
            );

            assert.equal(convertedInContract, convertedInTest);
        })

        it(`unable to set "${test.code}" => "PBL" rate to 0`, async () => {
            // Set correct rate initially
            await dataInstance.methods.updateRate(data.code, data.rate).send(
                { from: oracle, gas: gasLimit }
            );

            // Try setting 0 as a rate
            await dataInstance.methods.updateRate(data.code, 0).send(
                { from: oracle, gas: gasLimit }
            );

            // Current rate should be the previously set one
            assert.equal(data.rate, await dataInstance.methods.rates(data.code).call());
        });
    });
});
