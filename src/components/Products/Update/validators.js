import {timestampToDays} from '../../../utils';
import Moment from 'moment';

export const isNameValid = (value) => {
	return value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
	return value.length > 0 && value.length <= 5;
}


export const isRatingValid = (value) => {
	return value > 8;
};

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

export const isDateValid = (value) => {
    const formatDate = Moment().format('YYYY-MM-DD');
    const date2= new Date(value);
    const date1 = new Date(formatDate);
	// console.log(formatDate);
	// console.log(value);
    //console.log(getDifferenceInDays(date1,date2)>=30);
	return getDifferenceInDays(date1,date2)>=30 && date2>date1 ;
}