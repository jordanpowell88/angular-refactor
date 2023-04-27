import { Action, createReducer, on } from "@ngrx/store";
import { login, loginFailed, loginSuccess, logout } from "./login.actions";

export interface LoginState {
    isLoading: boolean;
    isAuthed: boolean;
    username: string;
    errorMessage: string;
}

export const LOGIN_FEATURE = 'login';

const initialState: LoginState = {
    isLoading: false,
    isAuthed: false,
    username: '',
    errorMessage: ''
}

const reducer = createReducer(
    initialState,
    on(login, (state, { username }) => ({
        ...state,
        username,
        isLoading: true,
        errorMessage: '',
    })),
    on(loginSuccess, (state, { username }) => ({
        ...state,
        username,
        isLoading: false,
        isAuthed: true,
    })),
    on(loginFailed, (state, { errorMessage }) => ({
        ...state,
        errorMessage,
        isLoading: false,
        isAuthed: false,
    })),
    on(logout, (state) => ({
        ...state,
        isAuthed: false,
        username: '',
        errorMessage: '',
    }))
)

export function loginReducer(
    state = initialState,
    action: Action
): LoginState {
    return reducer(state, action)
}