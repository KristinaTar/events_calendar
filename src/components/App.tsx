import React, {useState} from 'react';
import './App.scss';
import DatePicker from "./DatePicker/DatePicker";
import Calendar from "./Calendar/Calendar";


function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    //todo: localstorage loading
    return new Date().toISOString().substring(0, 10);
  });

  return (
    <div>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
}

export default App;
