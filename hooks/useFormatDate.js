import { useContext } from 'react';
import ProfileContext from '../context/profile/profileContext';

const useFormatDate = (date) => {
  const profileContext = useContext(ProfileContext);
  const { language } = profileContext;

  if(!date)
    return null;

  const engMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const frMonthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const monthNames = language === 'en' ? engMonthNames : frMonthNames;

  const d = new Date(date);

  // if(d.getFullYear() === new Date().getFullYear())
  //   return monthNames[d.getMonth()];

  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

export default useFormatDate;
