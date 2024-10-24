import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); //Id del index.hmtl

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () =>{
        console.log('cerrar modal');
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'//clase del fondo para que tenga efecto suave
            closeTimeoutMS={ 200 }
        >
            <h1>hooolaa</h1>
        </Modal>
    )
}
