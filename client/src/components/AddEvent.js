import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
function AddEvent(props) {
   
  const [startDate, onChange] = useState(new Date());
  
  const [endDate] = useState(new Date());
    const summary = React.useRef(null);
    const location = React.useRef(null);
    const description = React.useRef(null);
    const link = React.useRef(null); 
    var gapi=window.gapi
    var CLIENT_ID = '401504529815-727e68rq6tq6h5pa5p32rjvhemidti21.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyBk0ck8-CZe9bhp3h_Ux-ZCixCszH4qtgI';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";
    const handleClick = e => {
        e.preventDefault();
        
          gapi.load('client:auth2',() =>{
              console.log('loaded Client')
              gapi.client.init({
                  apiKey:API_KEY,
                  clientId:CLIENT_ID,
                  discoveryDocs:DISCOVERY_DOCS,
                  scope:SCOPES,
              })
              gapi.client.load('calendar','v3',()=>console.log('Done!'))
              gapi.auth2.getAuthInstance().signIn()
              .then(() => {
              
                var event = {
                    'summary': summary.current.value,
                    'location': location.current.value,
                    'description': description.current.value,
                    'start': {
                      'dateTime': startDate,
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': endDate,
                      'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                  
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  };
                  
          

                  var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                  })
          
                  request.execute(event => {
                    console.log(event)
                    window.open(event.htmlLink)
                  })
              })
          })
      }
  
return (
 
   
    
    <Fragment>
      <h1 className="large text-primary">EVENT</h1>
      <p className="lead">
        <i className="fas fa-calendar" /> Add Event to your calendar to set a reminder
      </p>
      <form  onSubmit={handleClick}>
       <div className= "form-group">
          <input
            type="text"
            placeholder="Event Name"
        
            ref={summary}
        
        
          />
        </div>
        <div className= "form-group">
          <input
            type="text"
            placeholder="Location"
            
            ref={location}
            
          />
          </div>
            <div className="form-group">
          <input
            type="text"
            placeholder="Enter Description"
            
            ref={description}
            
          />
        
        </div>


        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Meeting Link"
            
            ref={link}
            
          />
        
        </div>
        <p className="lead">
        <i className="fas fa-clock" /> Event Starting on
      </p>
        <div className= "form-group">
        <DateTimePicker
        onChange={onChange}
        value={startDate}
      />
      </div>

      <p className="lead">
        <i className="fas fa-clock" /> Event Ending on
      </p>
      <div className= "form-group">
        <DateTimePicker
        onChange={onChange}
        value={endDate}
      />
      </div >
        <input type="submit" className="btn btn-primary" value="AddEvent" />
      </form>
     
    </Fragment>
      
      
    
  

);
}

export default AddEvent;  