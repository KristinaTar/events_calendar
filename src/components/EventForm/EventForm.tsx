import React, { useEffect, useMemo, useState } from "react";
import "./EventForm.scss";
import * as api from "../../api/api";

type Props = {
  calendarEvents: CalendarEvents;
  closeForm: () => void;
  updateCalendarEvents: () => void;
  selectedEventPath: { key: string; index: number } | null;
  selectedDate: string;
  selectDate: (date: string) => void;
};

const EventForm: React.FC<Props> = (props) => {
  const { closeForm, updateCalendarEvents, calendarEvents, selectedEventPath, selectDate, selectedDate } = props;

  const [event, setEvent] = useState(() => {
    if (!selectedEventPath) {
      return {
        title: "",
        description: "",
        date: selectedDate,
        time: "",
      };
    }
    const { key, index } = selectedEventPath;
    const selectedEvent = calendarEvents[key]![index];
    return {
      title: selectedEvent.title,
      description: selectedEvent.description,
      date: selectedEvent.date,
      time: selectedEvent.time,
    };
  });

  useEffect(() => {
    if (!selectedEventPath) {
      return;
    }

    const { key, index } = selectedEventPath;
    const selectedEvent = calendarEvents[key]![index];

    setEvent({
      title: selectedEvent.title,
      description: selectedEvent.description,
      date: selectedEvent.date,
      time: selectedEvent.time,
    });
  }, [selectedEventPath?.key, selectedEventPath?.index]);

  const lastUpdateElement: string = useMemo(() => {
    if (!selectedEventPath) {
      return "";
    }
    const { key, index } = selectedEventPath;
    const eventObj = calendarEvents[key]![index];
    const dateTime = String(new Date(eventObj.updated || eventObj.created)).slice(4, 21);
    if (eventObj.updated) {
      return `Updated at ${dateTime}`;
    } else {
      return `Created at ${dateTime}`;
    }
  }, [selectedEventPath]);

  return (
    <form id="event-registration-form" method="POST" action="" className="addEvent_form_container">
      <div className="addEvent_form_header">
        <div className="addEvent_form_title_container">
          <div className="addEvent_form_title">Add new idea item</div>
          <div className="addEvent_form_title--date">{lastUpdateElement}</div>
        </div>
        <button type="button" className="addEvent_form_closeBtn" onClick={() => closeForm()}>
          X
        </button>
      </div>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Tittle (required)"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="description"></label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="date"></label>
        <input
          type="date"
          id="date"
          name="date"
          value={selectedDate}
          onChange={(e) => {
            selectDate(e.target.value);
            setEvent({...event, date: e.target.value});
          }}
        />
      </div>
      <div>
        <label htmlFor="time"></label>
        <input
          type="time"
          id="time"
          name="time"
          value={event.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
        />
      </div>
      <div className="event-form-button-container">
        {selectedEventPath && (
          <button
            type="button"
            className="addEvent_form_deleteBtn"
            onClick={async () => {
              await api.deleteEvent(selectedEventPath.key, selectedEventPath.index);
              updateCalendarEvents();
              setEvent({
                title: "",
                description: "",
                date: selectedDate,
                time: "",
              });
            }}
          >
            delete
          </button>
        )}
        <button
          disabled={event.title === "" || event.date === ""}
          type="button"
          className="addEvent_form_saveBtn"
          onClick={async () => {
            if (!selectedEventPath) {
              await api.addEvent(event);
              updateCalendarEvents();
            } else {
              const { key, index } = selectedEventPath;
              await api.updateEvent(key, index, event);
              updateCalendarEvents();
            }

            setEvent({
              title: "",
              description: "",
              date: selectedDate,
              time: "",
            });
          }}
        >
          save
        </button>
      </div>
    </form>
  );
};

export default EventForm;
