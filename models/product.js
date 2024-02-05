const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
    product: {
        public_id: { type: String },
        url: { type: String },
    },
    title: {
        type: String,
        required: true,
    },
    mob: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    descrip: {
        type: String,
        required: true,
    },
    createid: {
        type: String,
    },
    createdname: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

productSchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model("Product", productSchema);
