import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/rooms', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Chat Rooms</h3>
      <ul>
        {chatRooms.map(room => (
          <li key={room.id}>
            <Link to={`/chat/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/tasks">View Tasks</Link>
    </div>
  );
}

export default Dashboard;

