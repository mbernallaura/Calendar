import { createSlice } from '@reduxjs/toolkit';
//import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     notes: 'Comprar pastel',
//     start: new Date(), //Obligatorio
//     end: addHours(new Date(), 2), //Obligatorio
//     bgColor: '#fafafa',
//     user:{
//         _id:'123',
//         name: 'Laura Bernal'
//     }
// };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true, 
        events: [
            //tempEvent,
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
                if(event.id === payload.id){
                    return payload;
                }
                return event
            })
        },
        onDeleteEvent: (state) =>{
            if( state.activeEvent ){
                // Si hay una nota activa que la elimine
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },

        onLoadEvents: (state, { payload = [] }) =>{
            state.isLoadingEvents = false;
            //state.payload = payload;
            //!Verificar por el id del evento si no lo tengo ahi es cuando se quiere insertar
            payload.forEach(event => {
                //! some() = es lo mismo que el find pero devuelve un valor booleano
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push( event );
                }
            });
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;