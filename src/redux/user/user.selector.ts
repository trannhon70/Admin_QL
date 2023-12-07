import { createSelector } from '@reduxjs/toolkit';
interface IUsers{
    user: {
        user: {
            id: string,
            username: string,
            role: string,
            name: string,
            avatar: string,
            updatedAt: string,
            createdAt: string
        }
    }
}
export const getUser = (state: IUsers) => {
    return state.user.user;
  }