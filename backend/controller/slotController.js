import Slot from '../models/slotModel.js'
import sendVerificationToken from '../helpers/sendEmail/sendEmail.js'
const getSlot = async(req, res) => {
try {
    const slot = await Slot.find()
    res.status(200).json(slot)
} catch (error) {
 console.log(error)
 res.status(500).json({message: error})   
}
}
const getUserSlots = async(req, res) => {
    try {
        const {email} = req.user
        const slots = await Slot.find({email})
        res.status(200).json(slots) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

const addSlot = async(req,res) => {
try {
    const {date, time, recording_type,  session_duration} = req.body
    const {name, email} = req.user

    const slot = await Slot.create({
        name,
        email,
        date,
        time,
        recording_type,
        session_duration
    })

    // Send email to the person who created the slot
    const slotCreatorContent = `
      <p>Dear ${slot.name},</p>
      <p>Thank you for creating a new slot on our website. Here are the details:</p>
      <ul>
        <li><strong>Date:</strong> ${slot.date}</li>
        <li><strong>Time:</strong> ${slot.time}</li>
        <li><strong>Recording Type:</strong> ${slot.recording_type}</li>
        <li><strong>Session Duration:</strong> ${slot.session_duration}</li>
      </ul>
      <p>Please be on time for your scheduled session. If you are late or miss your slot, you may risk losing your chance.</p>
      <p>Best regards,<br>The PoeTherapy Team</p>
    `;
    sendVerificationToken(slot.email, 'Slot Created', slotCreatorContent);

     // Send email to the website owner
     const websiteOwnerContent = `
     <p>Dear Armand,</p>
     <p>A new slot has been created on your website. Here are the details:</p>
     <ul>
       <li><strong>Name:</strong> ${slot.name}</li>
       <li><strong>Email:</strong> ${slot.email}</li>
       <li><strong>Date:</strong> ${slot.date}</li>
       <li><strong>Time:</strong> ${slot.time}</li>
       <li><strong>Recording Type:</strong> ${slot.recording_type}</li>
       <li><strong>Session Duration:</strong> ${slot.session_duration}</li>
     </ul>
     <p>Please take note of this new slot and make necessary preparations.</p>
     <p>Best regards,<br>The PoeTherapy Team</p>
   `;
   sendVerificationToken('a2wskystudios@gmail.com', 'New Slot Created', websiteOwnerContent);

    res.status(200).json(slot)
} catch (error) {
    console.log(error)
    res.status(500).json({message: error})
}
}

const deleteSlot = async(req, res) => {
try {
    const { id } = req.params
    await Slot.findByIdAndDelete(id)
    res.status(200).json({message: 'deleted successfully'})
} catch (error) {
    console.log(error)
    res.status(500).json({message: error})
}
}

export {
    getSlot,
    addSlot,
    getUserSlots,
    deleteSlot
}