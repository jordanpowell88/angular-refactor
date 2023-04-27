import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LOGIN_FEATURE, LoginState } from "./login.reducer";

const loginFeatureState = createFeatureSelector<LoginState>(LOGIN_FEATURE);

export const selectIsLoading = createSelector(
    loginFeatureState,
    state => state.isLoading
)

export const selectUsername = createSelector(
    loginFeatureState,
    state => state.username
)

export const selectErrorMessage = createSelector(
    loginFeatureState,
    state => state.errorMessage
)

export const selectIsAuthed = createSelector(
    loginFeatureState,
    state => state.isAuthed
)

export const selectAppComponentViewModel = createSelector(
    loginFeatureState,
    ({ username, isAuthed, errorMessage }) => ({ username, isAuthed, errorMessage })
)