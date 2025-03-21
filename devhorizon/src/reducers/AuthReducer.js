//forma de manejar el estado para que sea mas facil de leer y de mantener(autenticacion por ejemplo)//

export const RESTORE_TOKE = "RESTORE_TOKEN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";


export const initialState = {
    userToken: null,
    user: null,
};

const AuthReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case RESTORE_TOKE:
            return {
                ...prevState,
                userToken: action.token,
                user: action.user,
            };
        case SIGN_IN:
            return {
                ...prevState,
                userToken: action.token,
                user: action.user,
            };
        case SIGN_OUT:
            return {
                ...prevState,
                userToken: null,
                user: null,
            };
        default:
            return prevState;
    }

};


export default AuthReducer;