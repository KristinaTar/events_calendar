import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import DatePicker from "./DatePicker/DatePicker";
import Calendar from "./Calendar/Calendar";
import EventForm from "./EventForm/EventForm";
import { formatDate } from "../helpers/helpers";
import * as api from "../api/api";

function App() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvents>({});
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("calendarSelectedDate") || formatDate(new Date())
  );
  const [selectedEventPath, setSelectedEventPath] = useState<null | { key: string; index: number }>(
    null
  );
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    api.getEvents().then((events) => {
      setCalendarEvents(events);
    });
  }, []);

  const editEvent = (key: string, index: number) => {
    setOpenForm(true);
    setSelectedEventPath({ key, index });
  };

  const closeForm = useCallback(() => {
    setOpenForm(false);
    setSelectedEventPath(null);
  }, []);

  const updateCalendarEvents = useCallback(() => {
    api.getEvents().then((events) => {
      setCalendarEvents(events);
    });
    setSelectedEventPath(null);
    setOpenForm(false);
  }, []);

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date);
    localStorage.setItem("calendarSelectedDate", date);
  }, []);

  return (
    <div className={openForm ? "main_container--with_form" : "main_container"}>
      {openForm && (
        <div className="event-form-container">
          <EventForm
            calendarEvents={calendarEvents}
            closeForm={closeForm}
            updateCalendarEvents={updateCalendarEvents}
            selectedEventPath={selectedEventPath}
            selectedDate={selectedDate}
            selectDate={selectDate}
          />
        </div>
      )}
      <div>
        <div className="add-event-date-picker_container">
          <button className="addEvent_btn" onClick={() => setOpenForm(true)}>
            Add event
          </button>
          <DatePicker selectedDate={selectedDate} selectDate={selectDate} />
        </div>
        <Calendar
          selectedDate={selectedDate}
          calendarEvents={calendarEvents}
          selectDate={selectDate}
          editEvent={editEvent}
        />
      </div>
    </div>
  );
}

export default App;
