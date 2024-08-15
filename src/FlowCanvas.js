import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
} from 'react-flow-renderer';
import Modal from 'react-modal';
import { Rnd } from 'react-rnd';
import './FlowCanvas.css';

Modal.setAppElement('#root');

const FlowCanvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const openModal = useCallback((id) => {
    setNodes((nds) => {
      const node = nds.find((n) => n.id === id);
      if (node) {
        setSelectedNode(node);
        setModalIsOpen(true);
      } else {
        console.error('Node not found with id:', id);
      }
      return nds;
    });
  }, []);

  const addCard = useCallback(() => {
    const id = `${nodeId}`;
    const detailedText = `This is the detailed text for card ${id}. It contains more information that can be viewed when you click "Show More".`;
    const newNode = {
      id,
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: (
          <CardContent
            id={id}
            detailedText={detailedText}
            openModal={openModal}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResize(id, { width: ref.style.width, height: ref.style.height }, position)
            }
          />
        ),
        detailedText,
        width: 200,
        height: 100,
      },
      style: {
        width: 200,
        height: 100,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeId((prevId) => prevId + 1);
  }, [nodeId]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );



  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedNode(null);
  };

  const handleResize = (id, size, position) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, width: size.width, height: size.height },
              position: {
                x: position.x,
                y: position.y,
              },
            }
          : node
      )
    );
  };

  const CardContent = ({ id, detailedText, openModal, onResizeStop }) => {
    const previewText = detailedText.split(' ').slice(0, 10).join(' ');

    return (
      <Rnd
        default={{
          width: 200,
          height: 100,
        }}
        minWidth={150}
        minHeight={50}
        bounds="parent"
        onResizeStop={onResizeStop}
        dragHandleClassName=".card-content"
      >
        <div className="card-content" style={{ width: '100%', height: '100%' }}>
          <p>{previewText}...</p>
          <button onClick={() => openModal(id)}>Show More</button>
        </div>
      </Rnd>
    );
  };

  return (
    <div className="flow-canvas">
      <ReactFlowProvider>
        <button onClick={addCard} className="add-card-button">Add Card</button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ width: '100%', height: '90vh' }}
        >
          <Background />
          <Controls />
        </ReactFlow>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Card Details"
          className="modal"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <h2>Card Details</h2>
          {selectedNode ? (
            <p>{selectedNode.data.detailedText}</p>
          ) : (
            <p>No details available.</p>
          )}
          <button onClick={closeModal} className="modal-close-button">Close</button>
        </Modal>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowCanvas;
