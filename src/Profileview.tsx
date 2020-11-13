import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TicketHistory from './TicketHistory';

function Profileview() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [rtime, setRtime] = useState('');
  const [tickets, setTickets] = useState('');
  const routerUrl = useLocation();

  useEffect(() => {
    const currentUrl = routerUrl.pathname;
    const index = currentUrl.lastIndexOf('/');
    const userId = currentUrl.substr(index + 1);
    const requestUrl = 'api/profileview/'.concat(userId);
    fetch(requestUrl)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setUser(data.username);
        setRtime(data.registration_datetime);
        setTickets(data.total_tickets);
      });
  }, []);
  return (
    <div className="Profile">
      <div className="profile-name">
        Name:&nbsp;
        {name}
      </div>
      <div className="profile-username">
        Username:&nbsp;
        { user}
      </div>
      <div className="profile-data">
        User Since:&nbsp;
        { rtime}
      </div>
      <div className="profile-total-tickets">
        Total Tickets:&nbsp;
        { tickets}
      </div>
      <TicketHistory />
    </div>
  );
}

export default Profileview;
