//
// Helper functions
//

function defaultValue(value, fallback) {
    return value = typeof value === 'undefined' ? fallback : value;
}

function addAccount(password) {
    return personal.newAccount(defaultValue(password, ''));
}

function getBalance (address) {
    return web3.fromWei(
        eth.getBalance(defaultValue(address, eth.coinbase)),
        'ether'
    );
}

function mine(amount, threads) {
    miner.start(defaultValue(threads, 10));
    admin.sleepBlocks(defaultValue(amount, 1));
    miner.stop();

    return true;
}

function start(threads) {
    return miner.start(defaultValue(threads, 10));
}

function stop() {
    return miner.stop();
}

function sendEther(amount, receiver) {
    personal.unlockAccount(eth.coinbase);

    return eth.sendTransaction({
        from: eth.coinbase,
        to: receiver,
        value: web3.toWei(amount, 'ether')
    });
}
