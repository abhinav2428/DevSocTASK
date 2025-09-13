const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const mongoose = require('mongoose');
const{ authenticate, isAdmin} = require('../middleware/auth');
const User = require("../models/user");
const user = require("../models/user");


router.get("/",authenticate, async(req, res) => {
    try{
        // console.log(req.body);
        // res.status(200).json({message: "Items fetched successfully"});
        const {status, category, location, date} = req.query;
        const filter = {};
        if(status) filter.status = status;
        if(category) filter.category = category;
        if(location) filter.location = location;
        if(date){
        const queryDate = new Date(date);
        filter.date = {
             $gte: new Date(queryDate.setHours(0, 0, 0, 0)),
                $lt: new Date(queryDate.setHours(23, 59, 59, 999))
            };
        }

        const items = await Item.find(filter);

        res.status(200).json({count: "items.kength", items});
        console.log(items);

        }catch(err){
            console.log(err);
            res.status(500).json({message: "Failed to fetch items", error: err.message})
        }
});


router.get("/:id",authenticate, async(req, res) => {
    try{
        const idparam = req.params.id;
        const items = await Item.findById(idparam);
        console.log(items);
        res.status(201).json({
        success: true,
        items,
      });
    }catch(err){
        console.log(err);
        res.status(400);
    }
});


router.post("/", authenticate, async (req, res) => {
    try{
        const {title, description, status, category, location, contact_info} = req.body;
        if(!title || !status || !category || !contact_info.phone_no){
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }
        const userid = req.body.user._id;   
        const user = await User.findById(userid);
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }  
        const newItem = new Item({title, description, status, category, location, contact_info, created_by: user._id});
        await newItem.save();
        res.status(200).json({
            message: "Item created successfully", 
            item: newItem
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to create item", 
            error: err.message});
    }
});


router.put('/:id', authenticate, async(req, res) => {
    try {
            if(User.findById(req.body.user._id).isAdmin != true && req.user._id!=Item.findById(request.params.id).created_by){
                res.status(400).json({message:"Only admin or creator can update"})
            };
        console.log(req.user._id);
        const idParam = req.params.id;
        const updateData = req.body;
        
        let updatedItem = await Item.findOneAndUpdate(
            { id: idParam },
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedItem && mongoose.Types.ObjectId.isValid(idParam)) {
            updatedItem = await Item.findByIdAndUpdate(
                idParam,
                updateData,
                { new: true, runValidators: true }
            );
        }
        
        if (!updatedItem) {
            return res.status(404).json({ 
                success: false, 
                message: 'Item not found' 
            });
        }
        
        return res.status(200).json({ 
            success: true, 
            message: 'Item updated successfully', 
            item: updatedItem 
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error while updating item',
            error: err.message
        });
    }
});

router.delete('/:id', authenticate, isAdmin, async(req, res) => {
    try{
        const idParam = req.params.id;
    let deleted = null;

    deleted = await Item.findOneAndDelete({ id: idParam });

    if (!deleted && mongoose.Types.ObjectId.isValid(idParam)) {
      deleted = await Item.findByIdAndDelete(idParam);
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    
    return res.status(200).json({ success: true, message: 'Item deleted', item: deleted });
    }catch(err){
        console.log(err);
        res.status(500);
    }
});

module.exports = router;