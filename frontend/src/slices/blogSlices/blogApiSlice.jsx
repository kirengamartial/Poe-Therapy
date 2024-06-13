import { apiSlice } from "../apiSlice";
const BASE_URL = '/blog'

const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postBlog: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-blog`,
                method: 'POST',
                body: data
            })
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-blog/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostBlogMutation, useDeleteBlogMutation} = blogApiSlice