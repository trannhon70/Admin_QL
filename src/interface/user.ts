export interface IUser {
    id: string,
    username: string,
    role: string,
    name: string,
    avatar: string,
}

export interface IRole{
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}
export interface IUserList {
    id: string,
    username: string,
    password: string,
    name: string,
    date: string,
    email: string,
    emailVeryfied: string,
    phone: string,
    address: string,
    role: any,
    avatar: string,
    createdAt: string,
    updatedAt: string,
}

export interface IListBrand {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}