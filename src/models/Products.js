import {Schema, model} from 'mongoose'

const productSchema = Schema ({
    name: String,
    price: Number,
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema);