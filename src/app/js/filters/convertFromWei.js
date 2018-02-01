import BN from 'bn.js';
const CONFIG = require('config/blockchain');

export default (value) => {
    const num = new BN(value);
    const decimal = new BN(CONFIG.decimals.toString());

    if (value) {
        return num.div(decimal).toNumber();
    }

    return 0;
}
