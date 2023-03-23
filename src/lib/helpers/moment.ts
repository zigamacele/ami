import moment from 'moment';

const currentMonth = moment().month();
console.log(currentMonth);
const currentYear = moment().year();

const currentAnimeSeason = (currentMonth: number) => {
  const WINTER = [0, 1, 2];
  const SPRING = [3, 4, 5];
  const SUMMER = [6, 7, 8];
  const FALL = [9, 10, 11];
  if (WINTER.includes(currentMonth)) return 'WINTER';
  if (SPRING.includes(currentMonth)) return 'SPRING';
  if (SUMMER.includes(currentMonth)) return 'SUMMER';
  if (FALL.includes(currentMonth)) return 'FALL';
};