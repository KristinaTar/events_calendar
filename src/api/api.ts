export function getEvents(): CalendarEvents {
  const storedData = localStorage.getItem('calendarEvents');
  if (!storedData) {
    return {};
  }
  return JSON.parse(storedData);
}

export function addEvent(
  event: EventData
): CalendarEvents {
  const newEvent: CalendarEvent = {
    ...event,
    created: Number(new Date()),
  };

  const events = getEvents();
  const dayEvents = events[event.date];
  if (dayEvents) {
    events[event.date] = [...dayEvents, newEvent];
  } else {
    events[event.date] = [newEvent];
  }

  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}

export function updateEvent(
  key: string,
  index: number,
  event: EventData,
): CalendarEvents {

  let events = getEvents();

  const newEvent: CalendarEvent = {
    ...event,
    updated: Number(new Date()),
    created: events[key]![index].created,
  };

  if (events[key]![index].date === event.date) {
    events[key]![index] = newEvent;
  } else {
    events[key]!.splice(index,1);
    if (events[newEvent.date]) {
      events[newEvent.date] = [...events[newEvent.date]!, newEvent];
    } else {
      events[newEvent.date] = [newEvent];
    }
  }

  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}

export function deleteEvent(
  key: string,
  index: number,
): CalendarEvents {
  const events = getEvents();

  events[key]!.splice(index,1);
  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}
