import Studio from '../models/studioModel.js'
import studioCloudinary from '../helpers/cloundinary/cloudinary.js'
import upload from '../helpers/multer/studioMulter.js'

const getStudio = async(req, res) => {
    try {
      const studio = await Studio.find()
      res.status(200).json(studio)   
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

const addStudio = async(req, res) => {
 upload(req, res, async(err) => {
    if(err) {
        return res.status(400).json({err})
    }

    if (req.file === undefined) {
        return res.status(400).json({ err: 'Please select a video' });
      }
  
      try {
        const result = await studioCloudinary.uploader.upload(req.file.path, {
          folder: "SUGIRA_STUDIO",
          resource_type: 'video',
        });

        const {title,description} = req.body
        const studio = new Studio({
          title,
          description,
          video: {
            public_id: result.public_id,
            secure_url: result.secure_url
          }
        });
  
        await studio.save();
  
        return res.status(200).json({
          message: 'Created Video successfully',
          id: studio._id,
          title: studio.title,
          video: studio.video.secure_url,
          description: studio.description
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
})
}

const editStudio = async(req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      try {
        const { id } = req.params;

        const studio = await Studio.findById(id);
        if (!studio) {
          return res.status(404).json({ message: 'Studio not found' });
        }

        let result;
        if (req.file) {
          result = await studioCloudinary.uploader.upload(req.file.path, {
            folder: "SUGIRA",
            resource_type: 'video',
          });
        } else {
          result = {
            secure_url: studio.video.secure_url,
            public_id: studio.video.public_id
          };
        }
       const {title,description} = req.body
        studio.video.secure_url = result.secure_url;
        studio.video.public_id = result.public_id;
        studio.description = description || studio.description;
        studio.title = title || studio.title

        await studio.save();
        res.status(200).json({
            message: 'Edited Studio successfully',
            id: studio._id,
            title: studio.title,
            image: studio.video.secure_url,
            description: studio.description
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
  });
}

const deleteStudio = async(req, res) => {
  try {
    const {id} = req.params

    await Studio.findByIdAndDelete(id)
     res.status(200).json({message: 'deleted successfully'})
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}

}

export {
  getStudio,
  addStudio,
  editStudio,
  deleteStudio
}