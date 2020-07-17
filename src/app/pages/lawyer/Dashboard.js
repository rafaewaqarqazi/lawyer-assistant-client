import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {useSelector} from "react-redux";
import _ from 'lodash'
const localizer = momentLocalizer(moment)
export default function Dashboard() {
  const { casesList, user } = useSelector(
    ({ cases: { casesList }, auth: { user } }) => ({
      casesList,
      user
    })
  );
  const [eventsList, setEventsList] = useState([
    {
      title: 'First Event',
      start: new Date(2020, 6, 4),
      end: new Date(2020, 6, 7),
      allDay: true
    }
  ])
  useEffect(() => {
    const hearings =  casesList.map(c => c.details.hearings)
    console.log('hearings', hearings)
    const events = _.flattenDeep(hearings).map(hearing => {
      return {
        title: hearing.title,
        start: new Date(hearing.date) ,
        end: new Date(hearing.date) ,
        allDay: true
      }
    })
    console.log('events', events)
    setEventsList(events)
  }, [casesList])

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
