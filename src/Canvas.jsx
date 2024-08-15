// import React, { useState } from 'react';
// import { useDrop } from 'react-dnd';
// import Card from './Card';
// import './Canvas.css';

// const Canvas = () => {
//   const [cards, setCards] = useState([]);

//   const [, drop] = useDrop({
//     accept: 'CARD',
//     drop: (item, monitor) => {
//       const delta = monitor.getDifferenceFromInitialOffset();
//       const left = Math.round(item.left + delta.x);
//       const top = Math.round(item.top + delta.y);
//       moveCard(item.id, left, top);
//       return undefined;
//     },
//   });

//   const moveCard = (id, left, top) => {
//     setCards(prevCards =>
//       prevCards.map(card => (card.id === id ? { ...card, left, top } : card))
//     );
//   };

//   const addCard = () => {
//     const id = cards.length + 1;
//     setCards([
//       ...cards,
//       { id, text: `Dummy text ${id}`, left: 100 + id * 10, top: 100 + id * 10 }
//     ]);
//   };

//   return (
//     <div ref={drop} className="canvas">
//       <button onClick={addCard}>Add Card</button>
//       {cards.map(card => (
//         <Card key={card.id} {...card} moveCard={moveCard} />
//       ))}
//     </div>
//   );
// };

// export default Canvas;
