import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { es } from 'date-fns/locale/es';
import { useUiStore } from "../../hooks";

registerLocale('es', es); //Para poder cambiar tanto el cuadro del mes y la hora en español

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
    const { isDateModalOpen, closeDateModal } =useUiStore();
    const [formSubmited, setFormSubmited] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'Laura',
        notes: 'Bernal',
        start: new Date(),
        end: addHours (new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if(!formSubmited)return '';
        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmited])

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
        closeDateModal();
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setFormSubmited(true);

        const difference = differenceInSeconds( formValues.end, formValues.start );
        if( isNaN(difference) || difference <= 0 ){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if(formValues.title.length <= 0) return; 
        console.log(formValues);
        
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'//clase del fondo para que tenga efecto suave
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <br />
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
                    <br />
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
                        className={`form-control ${ titleClass }`}
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
