import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostCommentMutation, useGetAllCommentQuery } from '../slices/commentSlices/commentApiSlice';
import { setComment, createComment } from '../slices/commentSlices/commentSlice';
import { useGetSingleBlogQuery } from '../slices/blogSlices/blogApiSlice';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'

const Blog = () => {
  const [stars, setStars] = useState('');
  const [comment, setComments] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch()

  const {data: blog, error} = useGetSingleBlogQuery(id)
  const {data: allComment, refetch} = useGetAllCommentQuery()

  const [postComment ] = usePostCommentMutation()
  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    if(allComment) {
      refetch()
      dispatch(setComment(allComment))
    }
  }, [allComment])

  const renderStars = (rating) => {
    const ratingValue = (() => {
      switch (rating) {
        case 'Excellent':
          return 5;
        case 'Very Good':
          return 4;
        case 'Good':
          return 3;
        case 'Fair':
          return 2;
        case 'poor':
          return 1;
        default:
          return 0;
      }
    })();

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < ratingValue ? 'text-yellow-500' : 'text-gray-400'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if(userInfo) {
        const data = {
          blogId: id,
          name: userInfo.name,
          performance: stars,
          description: comment
        }
        const res = await postComment(data).unwrap()
        dispatch(createComment({...res}))
        refetch()
        toast.success('created successfully')
      } else {
        toast.error('login first to comment')
      }

    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    } finally {
      setIsLoading(false)
    }
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error Occurred</h3>
            <div className="mt-2 text-sm text-red-700">
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? <Spinner/> : (
    <div className="flex justify-center mb-10">
      <div className='w-9/12 mt-2'>
        <div className='text-center'>
          <h1 className="text-2xl font-bold mb-4">{blog && blog.title}</h1>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{height: '2px'}}></div>
        </div>
        <div className="lg:flex items-start mb-6">
          <div className="overflow-hidden rounded-lg lg:mr-6" style={{width: "100%"}}>
            {blog && blog.image && (
              <img src={blog.image.secure_url} alt="Code Image" className="rounded-lg h-44 mb-10 w-full" />
            )}
            <p className="mb-6">
              {blog && blog.description}
            </p>
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {allComment && allComment.map((review) => (
                review.blogId === id && (
                  <div key={review._id} className="border border-gray-300 p-4 rounded-lg mb-4 flex justify-between items-start">
                    <div className="flex-grow">
                      <strong>{review.name}</strong>
                      <p>{review.description}</p>
                    </div>
                    <div className="ml-4">{renderStars(review.performance)}</div>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="mt-6 lg:mt-0 w-full">
            <form onSubmit={handleSubmit} className="relative mb-4">
              <select
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              >
                <option value="">Select an option</option>
                <option value="poor">poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Very Good">Very Good</option>
                <option value="Excellent">Excellent</option>
              </select>
              <textarea
                placeholder="Enter your message"
                rows={5}
                value={comment}
                onChange={e => setComments(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 resize-vertical"
              />
              <button type='submit' className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
