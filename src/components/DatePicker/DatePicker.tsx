import React from "react";
import arrowRight from '../../images/arrow-right.svg'
import arrowLeft from '../../images/arrow-left.svg'
import './DatePicker.scss';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}
const DatePicker: React.FC<Props> = ({selectedDate, setSelectedDate}) => {
  const splitDate = selectedDate.split('-');
  const selectedYear = splitDate[0];
  const month = MONTHS[parseInt(splitDate[1]) - 1];

  const decreaseMonth = () => {
    let monthNum: number | string = parseInt(splitDate[1]) - 1;
    let year = parseInt(splitDate[0]);
    if (monthNum === 0) {
      monthNum = 12;
      year--;
    }
    if (monthNum < 10) {
      monthNum = '0' + monthNum;
    }
    const newDate = `${year}-${monthNum}-01`
    setSelectedDate(newDate);
  }

  const increaseMonth = () => {
    let monthNum: number | string = parseInt(splitDate[1]) + 1;
    let year = parseInt(splitDate[0]);
    if (monthNum === 13) {
      monthNum = 1;
      year++
    }
    if (monthNum < 10) {
      monthNum = '0' + monthNum;
    }
    const newDate = `${year}-${monthNum}-01`
    setSelectedDate(newDate);
  }



  return (
    <div>
      <span>
        <img className="date-picker-arrow" src={arrowLeft} alt="arrowLeft" onClick={decreaseMonth}/>
        {`${month} ${selectedYear}`}
        <img className="date-picker-arrow" src={arrowRight} alt="arrowRight" onClick={increaseMonth}/>
      </span>
      <form className="date-picker-form">
        <div className="date-picker-container">
          <input
            className="date-picker"
            type="date"
            name="selected_date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          />
          <span className="date-picker-button">
            <button type="button">📅</button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default DatePicker;
