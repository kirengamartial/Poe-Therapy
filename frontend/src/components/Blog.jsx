import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostCommentMutation } from '../slices/commentSlices/commentApiSlice';
import { setComment, createComment } from '../slices/commentSlices/commentSlice';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Blog = () => {
  const [stars, setStars] = useState('');
  const [comment, setComments] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [blog, setBlog] = useState([])
  const [allComment, setAllComment] = useState([])

  const {id} = useParams()
  const dispatch = useDispatch()

  const [postComment ] = usePostCommentMutation()
  const {userBlog} = useSelector(state => state.blog)
  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    const handleGetData = async() => {
      setIsLoading(true)
      try {
        const singleBlog = userBlog.filter(blog => blog._id === id)
        if(userBlog && singleBlog) {
          setBlog(singleBlog[0])
        }

        const response = await fetch('/api/comment/get-comment', {
          method: 'GET'
        })
        const data = await response.json()
        dispatch(setComment(data))
        setAllComment(data)

      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error)
      } finally {
        setIsLoading(false)
      }
    }
    handleGetData()
  }, [userBlog])

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
        console.log(res)
        dispatch(createComment({...res}))
        setAllComment((prevComments) => [...prevComments, res]);
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

  return isLoading ? <Spinner/> : (
    <div className="flex justify-center mb-10">
      <div className='w-9/12 mt-2'>
        <div className='text-center'>
          <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          <div className="w-32 bg-orange-500 mx-auto mb-10" style={{height: '2px'}}></div>
        </div>
        <div className="lg:flex items-start mb-6">
          <div className="overflow-hidden rounded-lg lg:mr-6" style={{width: "100%"}}>
            {blog.image && (
              <img src={blog.image.secure_url} alt="Code Image" className="rounded-lg h-44 mb-10 w-full" />
            )}
            <p className="mb-6">
              {blog.description}
            </p>
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {allComment.map((review) => (
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
