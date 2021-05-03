import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DurationFilter = ({ selectedDuration, setSelectedDuration, durationFilter}) => {
  const [DurationTitle, setDurationTitle] = useState('Duration');

  const handleDuration = (e, f) => {
    console.log(selectedDuration)
    setSelectedDuration(Number(e))
    setDurationTitle(f.target.innerText)
    durationFilter()
  }

  return (
    <div id="duration-dropdown">
      <DropdownButton
      title={DurationTitle}
      name="duration"
      value={selectedDuration}
      onSelect={handleDuration}>
      <Dropdown.Item eventKey="1000"> Show All</Dropdown.Item>
      <Dropdown.Item eventKey="30"> Under 30 Minutes</Dropdown.Item>
      <Dropdown.Item eventKey="60"> Under 60 Minutes</Dropdown.Item>
      <Dropdown.Item eventKey="90"> Under 90 Minutes</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default DurationFilter