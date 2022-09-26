import {timestampToDays} from '../../../utils';
import Moment from 'moment';

export const isCategoriesValid = (value) => {
	return value.length > 0 && value.length <= 5;
}

export const isRatingValid = (value) => {
	return value.trim().length > 8;
};

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

export const isDateValid = (value) => {
    const formatDate = Moment().format('DD/MM/YYYY');
    const date2= new Date(value);
    const date1 = new Date(formatDate);


	return getDifferenceInDays(date1,date2)>=30;
}
