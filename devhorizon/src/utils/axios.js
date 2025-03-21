import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { USER_TOKEN_KEY } from '../providers/AuthProvider';

const axiosInstance = axios.create({
    baseURL: Constants.expoConfig.extra.api_url + '/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use(async req => {
    const access_token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
    req.headers = req.headers || {}; // Asegurar que headers existe
    req.headers["Authorization"] = `Bearer ${access_token}`;
    return req;
});


export default axiosInstance;