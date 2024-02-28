const asyncHandler = require("express-async-handler")
const Contact = require("../model/contactModel")
// @des Get all contact 
// route GET /api/contacts  
// @access private 

const getContact = asyncHandler(async (req,res)=>{
    const contacts = await  Contact.find({user_id : req.user.id})
    res.status(200).json(contacts)
})
// @des  Create contact 
// route Post /api/contacts /:id 
// @access private 

const createContact = asyncHandler(async (req,res)=>{
    const {name,email,phone} =req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Field are mandatory!")
    }
    const contact = await Contact.create({
        name ,
        email , 
        phone ,
        user_id : req.user.id
    })
    res.status(201).json(contact)
})

// @des  Update contact 
// route put /api/contacts /:id 
// @access private 


const updataContact=  asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User Couldn't have to update another user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact)
});

// @des  Delete contact by Id
// route delete /api/contacts /:id 
// @access private 
const deleteContact =  asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User Couldn't have to delete another user contacts")
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact)
});


// @des Get contact By Id
// route GET /api/contacts/:id  
// @access private 

const getContactById = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

module.exports = {
    getContact,
    createContact,
    updataContact,
    deleteContact,
    getContactById
}