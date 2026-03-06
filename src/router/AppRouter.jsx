import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
    // const authStatus = 'not-authenticated';
    const { status, checkAuthToken } = useAuthStore(); 

    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if( status === 'checking' ){
        return (
            <h3>Cargando...</h3>
        )
    }
    return (
        <Routes>
            {
                ( status === 'not-authenticated' )            
                ? (
                    <>
                        {/* Si no se esta autenticado la unica ruta que se puede acceder es /auth/login */}
                        <Route path="/auth/*" element={ <LoginPage/> }/>
                        <Route path="/*" element={ <Navigate to={'/auth/login'}/> }/>
                    </>
                )
                : (
                    <>
                        {/* El root de mi url(/) va a navegar a mi CalendarPage y cualquier ruta que no sea '/' va a navegar a '/' */}
                        <Route path="/" element={ <CalendarPage/> }/>
                        <Route path="/*" element={ <Navigate to={'/'}/> }/>
                    </>
                )
            }
        </Routes>
    )
}
