import React, {useCallback, useState} from 'react';
import './App.scss';
import DatePicker from "./DatePicker/DatePicker";
import Calendar from "./Calendar/Calendar";
import EventForm from "./EventForm/EventForm";
import * as api from "../api/api";
import {formatDate} from "../helpers/helpers";


function App() {
  const [calendarEvents, setCalendarEvents] = useState(api.getEvents());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<null | CalendarEvent>(null);
  const [selectedEventPath, setSelectedEventPath] = useState<undefined | { key: string, index: number }>(undefined);

  const closeForm = useCallback(() => {
    setOpenForm(false);
  },[]);

  const addNewEvent = useCallback((event: EventData) => {
    const updatedEvents = api.addEvent(event);
    setCalendarEvents(updatedEvents);
  },[]);

  const updateEvent = useCallback((key: string, index: number, event: EventData) => {
    const updatedEvents = api.updateEvent(key, index, event);
    setCalendarEvents(updatedEvents);
  },[]);

  const deleteEvent = useCallback((key: string, index: number) => {
    const updatedEvents = api.deleteEvent(key, index);
    setCalendarEvents(updatedEvents);
  },[]);

  const [openForm, setOpenForm] = useState(false);

  const editEvent = (key: string, index: number) => {
    setOpenForm(true);
    setSelectedEvent(calendarEvents[key]![index]);
  }

  return (
    <div className={openForm ? "main_container--with_form" : "main_container"}>
      {openForm && <div>
          <EventForm
              closeForm={closeForm}
              addNewEvent={addNewEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              selectedEvent={selectedEvent}
              eventPath={selectedEventPath}
          />
      </div>}
      <div>
        <div className="add-event-date-picker_container">
          <button
            className="addEvent_btn"
            onClick={() => setOpenForm(true)}
          >
            Add event
          </button>
          <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <Calendar
          selectedDate={selectedDate}
          calendarEvents={calendarEvents}
          editEvent={editEvent}
        />
      </div>
    </div>
  );
}

export default App;
