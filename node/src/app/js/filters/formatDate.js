import moment from 'moment';

export default (value, format = 'MMM Do, YYYY') => moment(value).format(format);
