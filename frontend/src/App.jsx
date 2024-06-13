import React from 'react'
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider

} from 'react-router-dom'
import { Provider } from 'react-redux'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import StudioPage from './pages/StudioPage'
import CreateSlotPage from './pages/CreateSlotPage'
import AddTimePage from './pages/AddTimePage'
import EditTimePage from './pages/EditTimePage'
import AllSlotPage from './pages/AllSlotPage'
import AllTimePage from './pages/AllTimePage'
import AdminAllSlotPage from './pages/AdminAllSlotPage'
import RegisterUserPage from './pages/RegisterUserPage'
import LoginUserPage from './pages/LoginUserPage'
import EditUserPage from './pages/EditUserPage'
import BlogPage from './pages/BlogPage'
import BlogsPage from './pages/BlogsPage'
import AddBlogPage from './pages/AddBlogPage'
import AddGalleryPage from './pages/AddGalleryPage'
import AddStudioPage from './pages/AddStudioPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AdminBlogPage from './pages/AdminBlogPage'
import AdminGalleryPage from './pages/AdminGalleryPage'
import AdminStudioPage from './pages/AdminStudioPage'
import EditBlogPage from './pages/EditBlogPage'
import EditGalleryPage from './pages/EditGalleryPage'
import EditStudioPage from './pages/EditStudioPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPageOnly from './pages/AdminPageOnly'
import PrivatePage from './pages/PrivatePage'
import store from './store'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/gallery' element={<GalleryPage />}/>
          <Route path='/studio' element={<StudioPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
          <Route path='/slot/:id' element={<CreateSlotPage />}/>
          <Route path='/all-slot' element={<AllSlotPage/>} />
          <Route path='/login' element={<LoginUserPage/>}/>
          <Route path='/register' element={<RegisterUserPage/>} />
          <Route path='/blog/:id' element={<BlogPage/>} />
          <Route path='/blogs' element={<BlogsPage/>} />
          <Route path='/forgot' element={<ForgotPasswordPage/>}/>
          <Route path='' element={<PrivatePage/>}>
              <Route path='/edit-user' element={<EditUserPage/>}/>
          </Route>
          <Route path='' element={<AdminPageOnly/>}>
              <Route path='/all-time' element={<AllTimePage/>}/>
              <Route path='/add-blog' element={<AddBlogPage/>}/>
              <Route path='/add-gallery' element={<AddGalleryPage/>}/>
              <Route path='/add-studio' element={<AddStudioPage/>}/>
              <Route path='/add-time' element={<AddTimePage />}/>
              <Route path='/edit-time/:id' element={<EditTimePage />}/>
              <Route path='/admin-all-slot' element={<AdminAllSlotPage/>} />
              <Route path='/admin-blog' element={<AdminBlogPage/>}/>
              <Route path='/admin-gallery' element={<AdminGalleryPage/>}/>
              <Route path='/admin-studio' element={<AdminStudioPage/>}/>
              <Route path='/admin-edit-blog/:id' element={<EditBlogPage/>}/>
              <Route path='/admin-edit-gallery/:id' element={<EditGalleryPage/>}/>
              <Route path='/admin-edit-studio/:id' element={<EditStudioPage/>}/>
          </Route>
          <Route path='/reset-password' element={<ResetPasswordPage/>}/>
        </Route>
    )
  )
  
  return (
    <Provider store={store}>
     <RouterProvider  router={router}/>
    </Provider>
  )
}

export default App
