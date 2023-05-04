import { createSelector } from 'reselect';

import { UserState } from './user.reducer';

const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser);
