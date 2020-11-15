import React, {Fragment, Component} from 'react'; 
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; 

 class EventCalendar extends Component {
    render(){
        return(
            <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
            }}         
            />
        )
    }
}
export default EventCalendar;