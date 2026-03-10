import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

//Variables de entorno
const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//Todo: configurar interceptores
//request = antes de que se haga la solicitud 
calendarApi.interceptors.request.use( config =>{
    //!Personalizar los headers
    config.headers = {
        ...config.headers,
        //Mandar el token, se encuentra en inspeccionar/Network/Headers/Request Headers
        //!Para que el backend sepa que estamos validados a traves del token
        //!Todas las peticiones van autenticadas 
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;