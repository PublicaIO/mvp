import numeral from 'numeral';

export default (value, format = '0,0') => numeral(value).format(format);
