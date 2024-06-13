import { apiSlice } from "../apiSlice";
const BASE_URL = '/slot'

const slotApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postSlot: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-slot`,
                method: 'POST',
                body: data
            })
        }),
        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-slot/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostSlotMutation, useDeleteSlotMutation} = slotApiSlice