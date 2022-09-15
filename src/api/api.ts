export async function getEvents(): Promise<CalendarEvents> {
  const storedData = localStorage.getItem("calendarEvents");
  if (!storedData) {
    return {};
  }

  return JSON.parse(storedData);
}

export async function addEvent(event: EventData): Promise<CalendarEvents> {
  const newEvent: CalendarEvent = {
    ...event,
    created: Number(new Date()),
  };

  const events = await getEvents();
  const dayEvents = events[event.date];
  if (dayEvents) {
    events[event.date] = [...dayEvents, newEvent];
  } else {
    events[event.date] = [newEvent];
  }

  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}

export async function updateEvent(
  key: string,
  index: number,
  event: EventData
): Promise<CalendarEvents> {
  const events = await getEvents();

  const newEvent: CalendarEvent = {
    ...event,
    updated: Number(new Date()),
    created: events[key]![index].created,
  };

  if (events[key]![index].date === event.date) {
    events[key]![index] = newEvent;
  } else {
    events[key]!.splice(index, 1);
    if (events[newEvent.date]) {
      events[newEvent.date] = [...events[newEvent.date]!, newEvent];
    } else {
      events[newEvent.date] = [newEvent];
    }
  }

  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}

export async function deleteEvent(key: string, index: number): Promise<CalendarEvents> {
  const events = await getEvents();

  events[key]!.splice(index, 1);
  localStorage.setItem("calendarEvents", JSON.stringify(events));

  return events;
}
