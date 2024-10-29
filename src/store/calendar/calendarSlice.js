import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
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
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;