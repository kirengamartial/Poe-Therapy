import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import timeRoutes from './routes/timeRoutes.js'
import slotRoutes from './routes/slotRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import studioRoutes from './routes/studioRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
dotenv.config()


connectDb()
const PORT = process.env.PORT || 5000


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "https://poe-therapy.vercel.app"],
    credentials: true
}))


if(process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  // API ROUTES
  app.use('/api/users', userRoutes);
  app.use('/api/time', timeRoutes);
  app.use('/api/slot', slotRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/studio', studioRoutes);
  app.use('/api/comment', commentRoutes);

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname,'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Server is ready'))
}


app.use('/api/users',userRoutes)
app.use('/api/time', timeRoutes)
app.use('/api/slot', slotRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/studio', studioRoutes)
app.use('/api/comment', commentRoutes)


export default app
