import React, {useEffect, useState} from "react";
import './EventForm.scss';

type Props = {
  selectedEvent: CalendarEvent | null;
  closeForm: () => void;
  addNewEvent: (eventData: EventData) => void;
  updateEvent: (key: string, index: number, event: EventData) => void;
  deleteEvent: (key: string, index: number) => void;
  eventPath: { key: string, index: number } | undefined;
}

const EventForm: React.FC<Props> = (props) => {
  const { closeForm, addNewEvent, updateEvent, deleteEvent, selectedEvent } = props;
  const [event, setEvent] = useState(() => {
    if (!selectedEvent) {
      return {
        title: "",
        description: "",
        date: "",
        time: "",
      };
    }

    return {
      title: selectedEvent.title,
      description: selectedEvent.description,
      date: selectedEvent.date,
      time: selectedEvent.time,
    }
  });

  useEffect(()=> {
    if (!selectedEvent) {
      return;
    }

    setEvent ({
      title: selectedEvent.title,
      description: selectedEvent.description,
      date: selectedEvent.date,
      time: selectedEvent.time,
    });
  }, [selectedEvent])

  return <form id="event-registration-form" method="POST" action="" className="addEvent_form_container">
    <div className="addEvent_form_header">
      <div className="addEvent_form_title"> Add new idea item</div>
      <button
        type="button"
        className="addEvent_form_closeBtn"
        onClick={() => closeForm()}
      >
        X
      </button>
    </div>
    <div>
      <label htmlFor="title"></label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Tittle"
        value={event.title}
        onChange={(e) => setEvent({...event, title: e.target.value})}
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
        onChange={(e) => setEvent({...event, description: e.target.value})}
      />
    </div>
    <div>
      <label htmlFor="date"></label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Date"
        value={event.date}
        onChange={(e) => setEvent({...event, date: e.target.value})}
      />
    </div>
    <div>
      <label htmlFor="time"></label>
      <input
        type="time"
        id="time"
        name="time"
        placeholder="Time"
        value={event.time}
        onChange={(e) => setEvent({...event, time: e.target.value})}
      />
    </div>
    <div>
      <button
        disabled={
          event.title === ""
          || event.description === ""
          || event.time === ""
          || event.date === ""
        }
        type="button"
        className="addEvent_form_saveBtn"
        onClick={() => {
          addNewEvent(event);



          setEvent({
            title: "",
            description: "",
            date: "",
            time: "",
          });
        }}
      >
        save
      </button>
    </div>
  </form>
}

export default EventForm;
