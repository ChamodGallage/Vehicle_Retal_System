import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import searchIcon from '../images/home/search.png';

import '../styles/AdminDashboard.css';
import '../styles/Chatbot.css';

import Image1 from '../images/sidenavbar/Dashboard.png';
import Image2 from '../images/sidenavbar/EVehicle.png';
import Image3 from '../images/sidenavbar/packages.png';
import Image4 from '../images/sidenavbar/Reservation.png';
import Image5 from '../images/sidenavbar/Maintenance.png';
import Image6 from '../images/sidenavbar/Damage.png';
import Image7 from '../images/sidenavbar/feedback.png';
import Image8 from '../images/sidenavbar/Loyalty.png';
import Image9 from '../images/sidenavbar/Delete.png';

import tesla from '../images/dashboard/GrayTesla.png'
import dashboardBG from '../images/dashboard/userDashboard.png'

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hello! Let's plan your trip. 🚗" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const updatedMessages = [...messages, { type: 'user', text: userInput }];
        setMessages(updatedMessages);

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();
            const formattedBotMessage = data.response.replace(/RS\./g, '<strong>RS.</strong>');

            setMessages(prev => [...prev, { type: 'bot', text: formattedBotMessage }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Sorry, something went wrong!" }]);
        }

        setUserInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    // Time
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // Date
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = currentDate.toLocaleDateString();

      const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/');
        } catch (err) {
          console.log(err);
        }
      }

    return (
        <div className='py-5'>

            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>

            <div className='bacgroundImage3'>
                <div className='dashboard'><img src={dashboardBG} className="dashboardImage" /></div>
                <p className='dashTitle'>Package AI</p>

                <br />
                <br />

                <div className="chat-container">
                <h2 className="chatbot-heading">ChatBot</h2>
                    <div className="chat-bot" id="chat-bot">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={msg.type === 'bot' ? 'bot-message' : 'user-message'}
                                dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            autoFocus
                        />
                        <button className="send-button" onClick={sendMessage}>Send</button>
                    </div>
                </div>

            </div>

            {/* Side Navbar */}
            <div id='side-navbar'>
                <ul>

                    <div id='clock'>
                        <div className='time font-monospace fs-1'>
                            {currentTime}
                        </div>
                        <div className='date fs-4'>
                            {formattedDate}
                        </div>
                    </div>

                    <br />
                    <LinkContainer to='/dashboard'>
                        <li>
                            <NavLink to='/dashboard' activeClassName='active-link' id='link'>
                                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/allvehicles'>
                        <li>
                            <NavLink to='/allvehicles' activeClassName='active-link' id='link'>
                                <img src={Image2} id='image1' />&nbsp;&nbsp; E-Vehicles
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/packages'>
                        <li>
                            <NavLink to='/packages' activeClassName='active-link' id='link'>
                                <img src={Image3} id='image1' />&nbsp;&nbsp; Packages
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/cusbookings'>
                        <li>
                            <NavLink to='/cusbookings' activeClassName='active-link' id='link'>
                                <img src={Image4} id='image1' />&nbsp;&nbsp; Reservation
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/maintenance'>
                        <li>
                            <NavLink to='/maintenance' activeClassName='active-link' id='link'>
                                <img src={Image5} id='image1' />&nbsp;&nbsp; Maintenace
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/incident'>
                        <li>
                            <NavLink to='/incident' activeClassName='active-link' id='link'>
                                <img src={Image6} id='image1' />&nbsp;&nbsp; Incidents
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/feedback'>
                        <li>
                            <NavLink to='/feedback' activeClassName='active-link' id='link'>
                                <img src={Image7} id='image1' />&nbsp;&nbsp; Feedback
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/loyalty'>
                        <li>
                            <NavLink to='/loyalty' activeClassName='active-link' id='link'>
                                <img src={Image8} id='image1' />&nbsp;&nbsp; Loyalty Points
                            </NavLink>
                        </li>
                    </LinkContainer>
                    <LinkContainer to='/logout' onClick={logoutHandler}>
                        <li>
                            <NavLink to='/logout' activeClassName='active-link' id='link'>
                                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
                            </NavLink>
                        </li>
                    </LinkContainer>
                </ul>
            </div>
            <img src={tesla} className="tesla" />
        </div>
    );
};

export default Chatbot;
