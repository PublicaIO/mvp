import CONFIG from 'config';

export default (value, rate = CONFIG.conversionRate) => {
    if (value && !isNaN(value)) {
        return parseInt(value) / rate;
    }

    return 0;
}
