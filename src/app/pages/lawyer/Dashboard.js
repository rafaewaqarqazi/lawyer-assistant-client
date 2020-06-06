import React, {useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";

const localizer = momentLocalizer(moment)
export default function Dashboard() {
  const [eventsList, setEventsList] = useState([
    {
      title: 'First Event',
      start: new Date(2020, 5, 4),
      end: new Date(2020, 5, 7),
      allDay: true
    }
  ])
  return (
    <div className='pb-5'>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Cases'
        />
        <PortletBody>
          <Calendar
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </PortletBody>
      </Portlet>
    </div>
  );
}
