import Time from '../models/timeModel.js'

const getTime = async(req, res) => {
    try {
        const time = await Time.find()
        res.status(200).json(time)
    } catch (error) {
        console.log(error)
        req.status(500).json({message: error})
    }
}

const addTime  = async(req, res) => {
    try {
        const {date, time} = req.body

        const times = await Time.create({
            date,
            time
        })
        res.status(200).json(times)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

const editTime = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, time, status } = req.body;
      const times = await Time.findById(id);
      if (times) {
        times.date = date || times.date;
        times.time = time || times.time;
        if (status !== undefined) {
          times.status = status;
        }
        const updatedTime = await times.save();
        res.status(200).json(updatedTime);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  };

const deleteTime = async(req, res) => {
    try {
        const { id } = req.params
        await Time.findByIdAndDelete(id)

        res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}


export {
    getTime,
    addTime,
    editTime,
    deleteTime
}