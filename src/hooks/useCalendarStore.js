import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async ( calendarEvent )=>{
        if (calendarEvent._id){
            //? Actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
        }else{
            //? Creando
            //Se mando calendarEvent porque contiene todo lo que se necesita en el body
            const { data } = await calendarApi.post('/events/new', calendarEvent, user);
            console.log({data});
            
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id }) );
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
            console.log({events});
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
