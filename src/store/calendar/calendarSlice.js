import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Comprar pastel',
    start: new Date(), //Obligatorio
    end: addHours(new Date(), 2), //Obligatorio
    bgColor: '#fafafa',
    user:{
        _id:'123',
        name: 'Laura Bernal'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent,
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) =>{
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) =>{
            state.events.push( payload ); //Redux toolkit
            state.activeEvent = null //Limpiar el evento activo
        },
        onUpdateEvent: (state, { payload }) =>{
            state.events = state.events.map(event =>{
                if(event._id === payload._id){
                    return payload;
                }
                return event
            })
        },
        onDeleteEvent: (state) =>{
            if( state.activeEvent ){
                // Si hay una nota activa que la elimine
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;