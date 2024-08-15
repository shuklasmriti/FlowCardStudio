import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import './Card.css';

const Card = ({ id, text, left, top, moveCard }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [, drag] = useDrag({
    type: 'CARD',
    item: { id, left, top },
  });

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <ResizableBox width={200} height={100} className="card-container">
      <div ref={drag} className="card" style={{ left, top, position: 'absolute' }}>
        <p>{text.slice(0, Math.floor(text.length / 2))}...</p>
        <button onClick={togglePopup}>Show more</button>
        {showPopup && (
          <div className="popup">
            <h2>Card Details</h2>
            <p>{text}</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        )}
      </div>
    </ResizableBox>
  );
};

export default Card;
