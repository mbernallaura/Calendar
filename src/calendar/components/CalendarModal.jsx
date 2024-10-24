import { useState } from "react";
import { addHours } from "date-fns";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

registerLocale('es', es);

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
    const [formValues, setFormValues] = useState({
        title: 'Laura',
        notes: 'Bernal',
        start: new Date(),
        end: addHours (new Date(), 2),
    })

    const onInputChange = ({ target }) =>{
        //Recibir target name: notes, title 
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing ) =>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

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
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={ formValues.start }
                        onChange={ (event)=> onDateChanged(event, 'start') }
                        className="form-control"
                        dateFormat={'Pp'}
                        showTimeSelect //Poner la seccion de la hora
                        locale='es' //Poner en español el mes, cuando seleccionas 
                        timeCaption="Hora" //Poner el titulo de la hora en español
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        onChange={ (event)=> onDateChanged(event, 'end') }
                        className="form-control"
                        dateFormat={'Pp'}
                        showTimeSelect
                        locale='es' 
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
