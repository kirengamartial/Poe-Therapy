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
        allBlog: builder.query({
            query: () => ({
                url: `${BASE_URL}/all-blog`,
                method: 'GET'
            })
        }),
        getSingleBlog: builder.query({
            query: (id) => ({
                url: `${BASE_URL}/single-blog/${id}`,
                method: 'GET'
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

export const {usePostBlogMutation, useDeleteBlogMutation, useAllBlogQuery, useGetSingleBlogQuery} = blogApiSlice