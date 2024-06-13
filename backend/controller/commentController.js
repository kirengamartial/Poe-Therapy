import Comment from '../models/commentModel.js'

const createComment = async(req, res) =>  {
    try {
        const {blogId, name, performance, description} = req.body

        const comment = await Comment.create({
            blogId,
            name,
            performance,
            description
        })

        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "server error"})
    }
}

const getComment = async(req, res) => {
    try {
        const comment = await Comment.find()
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "server error"})
    }
}

export {
    createComment,
    getComment
}