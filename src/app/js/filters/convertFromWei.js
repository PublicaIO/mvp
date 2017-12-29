import CONFIG from 'config';
import BN from 'bn.js';

export default (value) => {
    const num = new BN(value);
    const decimal = new BN(CONFIG.decimals.toString());

    if (value) {
        return num.div(decimal).toNumber();
    }

    return 0;
}
