import moment from 'moment';

/**
 * Formats the date to a human readable value.
 *
 * @param  {Object} timestamp The ISO timestamp.
 * @return {String} The human readable date format.
 */
export const formatDate = timestamp => moment(timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");

/**
 * Capitalizes the first letter of the given string.
 *
 * @param  {String} str The string to capitalize.
 * @return {String} The capitalized string.
 */
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
