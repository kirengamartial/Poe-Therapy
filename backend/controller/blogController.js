import Blog from '../models/blogModle.js'
import cloundinary from '../helpers/cloundinary/cloudinary.js'
import upload from '../helpers/multer/galleryMulter.js'

const getBlog = async(req, res) => {
    try {
      const blogs = await Blog.find()
      res.status(200).json(blogs)   
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}
const addBlog = async(req, res) => {

upload(req, res, async(err) => {
    if(err) {
        return res.status(400).json({err})
    }

    if (req.file === undefined) {
        return res.status(400).json({ err: 'Please select an image' });
      }
  
      try {
        const result = await cloundinary.uploader.upload(req.file.path, {
          folder: "SUGIRA_BLOG"
        });
          const {title, description} = req.body
        const blog = new Blog({
           title,
           description,
          image: {
            public_id: result.public_id,
            secure_url: result.secure_url
          }
        });
  
        await blog.save();
  
        return res.status(200).json({
          message: 'Created blog successfully',
          id: blog._id,
          title: blog.title,
          description: blog.description,
          image: blog.image.secure_url
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
})
}


const editBlog = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
          console.log(err)
          res.status(400).json({ err });
        } else {
          try {
            const { id } = req.params;
            const {title, description} = req.body
    
            const blog = await Blog.findById(id);
            if (!blog) {
              return res.status(404).json({ message: 'blog not found' });
            }
    
            let result;
            if (req.file) {
              result = await cloundinary.uploader.upload(req.file.path, {
                folder: "SUGIRA_BLOG",
              });
            } else {
              result = {
                secure_url: blog.image.secure_url,
                public_id: blog.image.public_id
              };
            }
      
            

            blog.title = title || blog.title,
            blog.description = description || blog.description
            blog.image.secure_url = result.secure_url;
            blog.image.public_id = result.public_id;
    
            await blog.save();
            res.status(200).json({
                message: 'Edited blog successfully',
                id: blog._id,
                title: blog.title,
                description: blog.description,
                image: blog.image.secure_url
              });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      });
}

const deleteBlog = async(req, res) => {
    try {
        const {id} = req.params

        await Blog.findByIdAndDelete(id)
         res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
    
}

export {
    getBlog,
    addBlog,
    editBlog,
    deleteBlog
}