import React, { useState, useEffect } from "react";
import "./EventForm.css";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recurringDays, setRecurringDays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Check if there are stored events in localStorage
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleRecurringDayChange = (day) => {
    const isChecked = recurringDays.includes(day);

    if (isChecked) {
      setRecurringDays(recurringDays.filter((d) => d !== day));
    } else {
      setRecurringDays([...recurringDays, day]);
    }
  };

  const recurringDayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAddEvent = () => {
    const newEvent = {
      eventName,
      startDate,
      endDate,
      recurringDays,
    };



    setEvents([...events, newEvent]);
    localStorage.setItem("events", JSON.stringify([...events, newEvent]));
    

    // Clear the form fields
    setEventName("");
    setStartDate("");
    setEndDate("");
    setRecurringDays([]);
  };

  return (
    <div className="event-form">
      <h2>Event Form</h2>
      <div>
        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={handleEventNameChange} />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <div>
        <label>Recurring Days:</label>
        {recurringDayOptions.map((day) => (
          <div key={day}>
            <label>
              <input
                type="checkbox"
                checked={recurringDays.includes(day)}
                onChange={() => handleRecurringDayChange(day)}
              />
              {day}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleAddEvent}>Add Event</button>

      <h2>Added Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <div>Event Name: {event.eventName}</div>
              <div>Start Date: {event.startDate}</div>
              <div>End Date: {event.endDate}</div>
              <div>Recurring Days: {event.recurringDays.join(", ")}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events added yet.</p>
      )}
    </div>
  );
};

export default EventForm;
