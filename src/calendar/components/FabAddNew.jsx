import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";


export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } =useCalendarStore();
    const handleClickNew = ()=>{
        setActiveEvent({
            //! Limpiar la nota si se ve una nota activa
            title: '',
            notes: '',
            start: new Date(), //Obligatorio
            end: addHours(new Date(), 2), //Obligatorio
            bgColor: '#fafafa',
            user:{
                _id:'123',
                name: 'Laura Bernal'
            }
        });
        openDateModal();
    }
    
    return (
        <button
            className='btn btn-primary fab'
            onClick={handleClickNew}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
