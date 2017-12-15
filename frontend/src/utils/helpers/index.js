import moment from 'moment';

export const formatDate = timestamp => moment(timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
