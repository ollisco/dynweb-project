import { DateInput } from '@mantine/dates'
import Model from '../../Model'
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { calAuth } from '../../calendarSource';

type InformationViewProps = {
  originAddress: string | null
  destinationAddress: string
  day: Date | null
  leaveTime: string
  arriveTime: string
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
  setDay: (value: Date) => void
}

const InformationView = ({
  originAddress,
  destinationAddress,
  day,
  leaveTime,
  arriveTime,
  setDay,
  searchClicked,
}: InformationViewProps) => {

  return (
    <div>
      <DateInput
        value={day}
        onChange={setDay}
        required
        label="Day of travel"
        placeholder="Select day"
        maw={400}
        minDate={new Date()}
      />
      <Button
        onClick={calAuth}
        >
        Allow Google Calendar access
      </Button>
      <Button
        onClick={searchClicked}
        >
        Perform Search
      </Button>
      <h2>Your commute:</h2>
      <div>You should leave {originAddress} at {leaveTime} in order to arrive at {destinationAddress} at {arriveTime}</div>
    </div>
  )
}

export default InformationView
