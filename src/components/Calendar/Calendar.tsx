import React from "react";
import "./Calendar.scss";
import { formatDate } from "../../helpers/helpers";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Props = {
  calendarEvents: CalendarEvents;
  selectedDate: string;
  editEvent: (key: string, index: number) => void;
  selectDate: (date: string) => void;
};
const Calendar: React.FC<Props> = ({ calendarEvents, selectDate, selectedDate, editEvent }) => {
  const splitDate = selectedDate.split("-");
  const year = parseInt(splitDate[0]);
  const month = parseInt(splitDate[1]) - 1;
  const date = new Date(year, month);
  const today = new Date();

  const emptyCellsNum = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const calendarContent: JSX.Element[] = [];

  for (let i = 0; i < emptyCellsNum; i++) {
    calendarContent.push(<div className="empty-cell" key={`emptyCell-${i}`}></div>);
  }

  do {
    const key = formatDate(date);

    const cellContent = (
      <div
        key={`cell-${date.getDate()}`}
        className={
          date.getDate() === today.getDate() &&
          today.getFullYear() === year &&
          today.getMonth() === month
            ? "calendar_cell today"
            : "calendar_cell"
        }
      >
        <div className="calendar_cell__day">
          <div>{DAYS[date.getDay()]}</div>
          <div>{date.getDate()}</div>
        </div>
        <div
          className="calendar_cell__events_container"
          onClick={(e) => {
            e.stopPropagation();
            selectDate(key);
          }}
        >
          {calendarEvents[key] &&
            calendarEvents[key]!.map((event, index) => (
              <div
                key={`${event.date}-${index}`}
                className="eventInfo"
                onClick={() => editEvent(key, index)}
              >
                {event.title}
              </div>
            ))}
        </div>
      </div>
    );
    calendarContent.push(cellContent);

    date.setDate(date.getDate() + 1);
  } while (date.getDate() !== 1);

  return <div className="calendar_container">{calendarContent}</div>;
};

export default Calendar;
