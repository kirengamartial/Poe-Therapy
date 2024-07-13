import { apiSlice } from "../apiSlice";
const BASE_URL = "/users"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/logout`,
                method: 'POST'
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/edit`,
                method: 'PUT',
                body: data
            })
        }),
        googleLogin: builder.mutation({
            query: (data) => ({
                url:`${BASE_URL}/login-google`,
                method: 'POST',
                body: data
            })
        }),
        googleRegister: builder.mutation({
            query: (data) => ({
                url:`${BASE_URL}/register-google`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useRegisterMutation, useLogOutMutation, useLoginMutation, useGoogleLoginMutation, useEditUserMutation, useGoogleRegisterMutation} = userApiSlice