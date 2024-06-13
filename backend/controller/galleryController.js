import Gallery from '../models/galleryModel.js'
import cloundinary from '../helpers/cloundinary/cloudinary.js'
import upload from '../helpers/multer/galleryMulter.js'

const getGallery = async(req, res) => {
    try {
      const gallery = await Gallery.find()
      res.status(200).json(gallery)   
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}
const addGallery = async(req, res) => {

upload(req, res, async(err) => {
    if(err) {
        return res.status(400).json({err})
    }

    if (req.file === undefined) {
        return res.status(400).json({ err: 'Please select an image' });
      }
  
      try {
        const result = await cloundinary.uploader.upload(req.file.path, {
          folder: "SUGIRA_GALLERY"
        });
  
        const gallery = new Gallery({
          image: {
            public_id: result.public_id,
            secure_url: result.secure_url
          }
        });
  
        await gallery.save();
  
        return res.status(200).json({
          message: 'Created gallery successfully',
          id: gallery._id,
          image: gallery.image.secure_url
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
})
}


const editGallery = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
          res.status(400).json({ err });
        } else {
          try {
            const { id } = req.params;
    
            const gallery = await Gallery.findById(id);
            if (!gallery) {
              return res.status(404).json({ message: 'gallery not found' });
            }
    
            let result;
            if (req.file) {
              result = await cloundinary.uploader.upload(req.file.path, {
                folder: "SUGIRA",
              });
            } else {
              result = {
                secure_url: gallery.image.secure_url,
                public_id: gallery.image.public_id
              };
            }
    
            gallery.image.secure_url = result.secure_url;
            gallery.image.public_id = result.public_id;
    
            await gallery.save();
            res.status(200).json({
                message: 'Edited gallery successfully',
                id: gallery._id,
                image: gallery.image.secure_url
              });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      });
}

const deleteGallery = async(req, res) => {
    try {
        const {id} = req.params

        await Gallery.findByIdAndDelete(id)
         res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
    
}

export {
    getGallery,
    addGallery,
    editGallery,
    deleteGallery
}