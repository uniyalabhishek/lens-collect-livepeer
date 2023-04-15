import React, { useState } from "react";
import styles from "../styles/Ticket.module.css";

const Ticket = ({ eventTitle, eventColor }) => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className={styles.ticket} style={{ borderColor: eventColor }}>
      <div className={styles.ticketHeader} style={{ backgroundColor: eventColor }}>
        <h3>{eventTitle}</h3>
      </div>
      <div className={styles.ticketContent}>
        <p>
          Date: <span>MM/DD/YYYY</span>
        </p>
        <p>
          Time: <span>HH:mm</span>
        </p>
        <p>
          Price: <span>$0</span>
        </p>
        {!registered ? (
          <form onSubmit={handleRegister} className={styles.registrationForm}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
            <button type="submit" className={styles.registerButton}>
              Register
            </button>
          </form>
        ) : (
          <p className={styles.registrationSuccess}>You are registered!</p>
        )}
      </div>
    </div>
  );
};

export default Ticket;
