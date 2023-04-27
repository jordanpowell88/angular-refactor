import { createAction, props } from "@ngrx/store";

export const login = createAction('[APP COMPONENT] attempt login', props<{ username: string, password: string }>())
export const loginSuccess = createAction('[LOGIN SERVICE] login success', props<{ username: string }>());
export const loginFailed = createAction('[LOGIN SERVICE] login failed', props<{ errorMessage: string }>());
export const logout = createAction('[APP COMPONENT] logout');