import React from "react";
import './Calendar.scss';

const DAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

type Props = {
  selectedDate: string;
  setSelectedDate: (date:string)=> void;
}
const Calendar: React.FC<Props> = ({selectedDate, setSelectedDate}) => {
  const splitDate = selectedDate.split('-');
  const year = parseInt(splitDate[0]);
  const month = parseInt(splitDate[1]) - 1;
  const date = new Date(year, month);

  const emptyCellsNum = date.getDay() === 0 ? 6 : date.getDay() - 1;

  let calendarContent: JSX.Element[] = [];
  console.log(parseInt(splitDate[2]))

  for (let i = 0; i < emptyCellsNum; i++) {
    calendarContent.push(<div></div>);
  }

  do {
    const cellContent = (<div
      className={parseInt(splitDate[2]) === date.getDate()  ? "calendar_cell active": "calendar_cell"}
    >
      <div className="calendar_cell__day">
        <div>
          {DAYS[date.getDay()]}
        </div>
        <div>
          {date.getDate()}
        </div>
      </div>

    </div>);
    calendarContent.push(cellContent);

    date.setDate(date.getDate() + 1);
  } while (date.getDate() !== 1);

  return (
    <div className="calendar_container">
      {calendarContent}
    </div>
  );
}

export default Calendar;
