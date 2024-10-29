import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "..";

import { localizer, getMessagesEs } from '../../helpers';
import { useUiStore } from '../../hooks';


const events = [{
    title: 'Cumpleaños del jefe',
    notes: 'Comprar pastel',
    start: new Date(), //Obligatorio
    end: addHours(new Date(), 2), //Obligatorio
    bgColor: '#fafafa',
    user:{
        _id:'123',
        name: 'Laura Bernal'
    }
}]

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    const eventStyleGetter = ( event, start, end, isSelected ) =>{

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return{ style }
    }

    const onDoubleClick = (event) =>{
        //Para abrir el modal para editar la info que ya se tiene en el event
        console.log({doubleClick: event});
        openDateModal();
    }

    const onSelect = (event) =>{
        //
        console.log({click: event});
    }

    const onViewChange = (event) =>{
        //Saber en que paginas estoy si en el MES, SEMANA, DIA, AGENDA
        localStorage.setItem('lastView', event);
        setLastView( event );
    }

    return (
        <>
            <Navbar/>
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px )' }}
                messages={ getMessagesEs() }
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
            />
            <CalendarModal/>
        </>
    )
}

