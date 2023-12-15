import { createSelector } from '@reduxjs/toolkit';
interface IUsers{
    user: {
        user: {
            id: string,
            username: string,
            role: any,
            name: string,
            avatar: string,
            updatedAt: string,
            createdAt: string
        }
        listUser: []
    }
}
export const getUser = (state: IUsers) => {
    return state.user.user;
  }

  export const getPagingUser = (state : IUsers) => {
    return state.user
  }