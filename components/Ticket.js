import React from "react";
import styles from "../styles/Ticket.module.css";

const Ticket = ({ eventTitle, eventColor }) => {
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
      </div>
    </div>
  );
};

export default Ticket;
