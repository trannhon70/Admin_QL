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
        listUser: [];
        count: 0,
        totalPages: 0,
        pageSize: 10,
        pageIndex: 1,
    }
}
export const getUser = (state: IUsers) => {
    return state.user.user;
  }

  export const getPagingUser = (state : IUsers) => {
    return state.user
  }