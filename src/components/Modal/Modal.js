import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // set app root element for accessibility

const App = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOkClick = () => {
        console.log("OK clicked");
        handleCloseModal();
    };

    const handleCancelClick = () => {
        console.log("Cancel clicked");
        handleCloseModal();
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Show Modal</button>
            <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
                <h2>Are you sure?</h2>
                <p>This action cannot be undone.</p>
                <div>
                    <button onClick={handleOkClick}>OK</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
};

export default App;
