import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Neighborhood = ({ fields, setFields, showAll }) => {
  const [hoodTitle, setHoodTitle] = useState('Select Neighborhood');

  const handleSelect = (e, f) => {
    setFields({...fields, neighborhood: e})
    setHoodTitle(f.target.innerText)
  }

  const handleDuration = (e) => {
    console.log(selectedDuration)
    setSelectedDuration(Number(e))
    durationFilter()
  }

  return (
    <div className="neighborhood-dropdown">
      <DropdownButton
        title={hoodTitle}
        name="neighborhood"
        type="neighborhood"
        value={fields.neighborhood}
        onSelect={handleSelect}>
          { !showAll ? null : <Dropdown.Item eventKey="All Neighborhoods">All Neighborhoods</Dropdown.Item> }
          <Dropdown.Item eventKey="Arlington Heights">Arlington Heights</Dropdown.Item>
          <Dropdown.Item eventKey="Beverly Grove">Beverly Grove</Dropdown.Item>
          <Dropdown.Item eventKey="Carthay">Carthay</Dropdown.Item>
          <Dropdown.Item eventKey="Chinatown">Chinatown</Dropdown.Item>
          <Dropdown.Item eventKey="Downtown">Downtown</Dropdown.Item>
          <Dropdown.Item eventKey="East Hollywood">East Hollywood</Dropdown.Item>
          <Dropdown.Item eventKey="Echo Park">Echo Park</Dropdown.Item>
          <Dropdown.Item eventKey="Elysian Park">Elysian Park</Dropdown.Item>
          <Dropdown.Item eventKey="Elysian Valley">Elysian Valley</Dropdown.Item>
          <Dropdown.Item eventKey="Fairfax">Fairfax</Dropdown.Item>
          <Dropdown.Item eventKey="Griffith Park">Griffith Park</Dropdown.Item>
          <Dropdown.Item eventKey="Hancock Park">Hancock Park</Dropdown.Item>
          <Dropdown.Item eventKey="Harvard Heights">Harvard Heights</Dropdown.Item>
          <Dropdown.Item eventKey="Hollywood">Hollywood</Dropdown.Item>
          <Dropdown.Item eventKey="Hollywood Hills">Hollywood Hills</Dropdown.Item>
          <Dropdown.Item eventKey="Hollywood Hills West">Hollywood Hills West</Dropdown.Item>
          <Dropdown.Item eventKey="Koreatown">Koreatown</Dropdown.Item>
          <Dropdown.Item eventKey="Los Feliz">Los Feliz</Dropdown.Item>
          <Dropdown.Item eventKey="Mid-City">Mid-City</Dropdown.Item>
          <Dropdown.Item eventKey="Mid-Wilshire">Mid-Wilshire</Dropdown.Item>
          <Dropdown.Item eventKey="Pico-Union">Pico-Union</Dropdown.Item>
          <Dropdown.Item eventKey="Silver Lake">Silver Lake</Dropdown.Item>
          <Dropdown.Item eventKey="West Hollywood">West Hollywood</Dropdown.Item>
          <Dropdown.Item eventKey="Westlake">Westlake</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default Neighborhood