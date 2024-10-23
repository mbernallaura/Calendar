import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import enUS from 'date-fns/locale/en-US';
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';

import { Navbar } from "..";

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

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
    return (
        <>
            <Navbar/>
            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px )' }}
            />
        </>
    )
}

