import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async ( calendarEvent )=>{
        try {
            if (calendarEvent.id){
                //? Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
                return;
            }
            //? Creando
            //Se mando calendarEvent porque contiene todo lo que se necesita en el body
            const { data } = await calendarApi.post('/events/new', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al cargar', error.response.data.msg, 'error');
        }

        
    }

    const startDeletingEvent = () =>{
        //Todo: Llegar al backend
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() =>{
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch( onLoadEvents( events ) );
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, //!Si es null regresara falso

        //* Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
