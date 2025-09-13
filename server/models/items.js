const mongooose = require("mongoose");
const itemSchema = new mongooose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        Enumerator: ["Lost", "Found", "Claimed"], 
        required: true
    },
    category: {
        type: String, 
        Enumerator: ["Electronics", "Accessories", "Books", "Others"], 
        required: true
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    contact_info: {
        phone_no: {
            type: String, 
            required: true
        },
        email: {
            type: String
        }
    },
    image_urls: [String],
    created_at: {type: Date, default: Date.now()},
    created_by: {
        type: String,
        required: true,
    }
});

itemSchema.index()
module.exports = mongooose.model("Item", itemSchema);