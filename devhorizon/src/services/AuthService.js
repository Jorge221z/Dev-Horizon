import axios from '../utils/axios';
import { Platform } from 'react-native'; //para saber en que plataforma estamos(android, ios, web)//
import { setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { USER_TOKEN_KEY, USER_KEY } from '../providers/AuthProvider';
import { errorHandler } from '../utils/axiosErrorHandler';

export async function login (data) {
    try {
        data.device_name = Platform.OS; //asi sabemos el so del dispositivo//
        let response = await axios.post("login", data); //hacemos la peticion a la API//
        console.log("Respuesta del servidor:", response.data);

        await setItemAsync(USER_TOKEN_KEY, response.data.data.token); //guardamos el token en el almacenamiento seguro//
        await setItemAsync(USER_KEY, JSON.stringify(response.data.data.user)); //guardamos el usuario en el almacenamiento seguro//
        return response.data; //retornamos los datos del usuario//
    
    } catch (error) { //si falla algo de la API, lo mostramos en el cliente//
        throw errorHandler(error);
    }
}


export async function signup (data) {
    try {
        let response = await axios.post("signup", data);
        console.log("Respuesta del servidor:", response.data.message);
        return response.data.message;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function logout() {
    try {
        // Intenta hacer logout en el backend (usando el token actual)
        const response = await axios.post("logout");
        
        // Borra el token SIEMPRE, incluso si el backend falla
        await deleteItemAsync(USER_TOKEN_KEY);
        await deleteItemAsync(USER_KEY);

        return response.data;
    } catch (error) {
        // Si el error es 401, ignóralo (el token ya era inválido)
        if (error.response?.status !== 401) {
            throw errorHandler(error);
        }
        return;
    }
}