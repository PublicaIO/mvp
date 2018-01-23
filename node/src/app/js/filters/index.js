import convertFromWei from './convertFromWei';
import convertToFiat from './convertToFiat';
import convertToPbl from './convertToPbl';
import formatNumber from './formatNumber';
import formatDate from './formatDate';

export default [
    {
        title: 'convertFromWei',
        filter: convertFromWei
    },
    {
        title: 'convertToFiat',
        filter: convertToFiat
    },
    {
        title: 'convertToPbl',
        filter: convertToPbl
    },
    {
        title: 'formatNumber',
        filter: formatNumber
    },
    {
        title: 'formatDate',
        filter: formatDate
    }
];
