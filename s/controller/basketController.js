const Basket = require("../models/Basket")
const Product = require("../models/Product")

const createNewBasket = async (req, res) => {
    const { _idUser } = req.body
    if (!_idUser)
        return res.status(400).json({ message: "_idUser is required" })
    const basket = await Basket.create({ user: _idUser })
    res.status(200).json({ message: basket._id })
}

const getAllProducts = async (req, res) => {
    console.log("getAllProductssss");
    const { _idBasket } = req.params
    console.log(_idBasket);
    if (!_idBasket)
        return res.status(400).json({ message: "_idBasket are required" })
    const basket = await Basket.findById(_idBasket).populate("products.product")
    console.log("Basket contents:", JSON.stringify(basket.products, null, 2));

    if (!basket)
        return res.status(404).json({ message: "Basket not found" })

    // const result = basket.products.map((item) => ({
    //     product: item.product,
    //     quentity: item.quentity,
    // }));
    return res.status(200).json(basket.products)
}

const getBasket = async (req, res) => {
    const { _idUser } = req.params
    if (!_idUser) {
        return res.status(400).json({ message: "user not exiset" })
    }
    const basket = await Basket.findOne({ user: _idUser }).lean()
    if (!basket)
        return res.status(404).json({ message: "dont have basket for this user" })
    res.status(200).json(basket)
    console.log("getBasket");
    console.log(basket);

}

const getById = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).json({ message: "_idBasket is required" })
    const basket = await Basket.findById(_id).lean()
    if (!basket)
        return res.status(404).json({ message: "dont have basket" })
    res.status(200).json(basket)
}


const addAndUpdate = async (req, res) => {
    const { _idBasket, _idProduct, quentity } = req.body//הגי פי טי אמר שעדיף לקבל אידי של המשתמש אבל אם יש למשתמש כמה סלים?
    console.log("quentity", quentity, "_idProduct", _idProduct, "");
    const basket = await Basket.findById({ _id: _idBasket })
    console.log("הצלחתי למצוא תסל", basket);
    const ProductToAdd = await Product.findById({ _id: _idProduct })
    console.log("הצלחתי למצוא תמוצר", ProductToAdd);

    if (!basket || !ProductToAdd)
        return res.status(400).json({ message: "basket or product not found" })
    const existing = basket.products.find(p => p.product.equals(_idProduct))
    if (existing)
        existing.quentity += 1
    else
        basket.products.push({ product: _idProduct, quentity })
    await basket.save()
    res.json({ message: "product added to basket" })
}

const deleteAndUpdate = async (req, res) => {
    const { _idBasket, _idProduct, quentity } = req.body
    const basket = await Basket.findById(_idBasket)
    if (!basket)
        return res.status(400).json({ message: "basket not found" })
    const product = basket.products.find(p => p.product.equals(_idProduct))
    if (!product)
        return res.status(400).json({ message: "this product not exists in the basket" })
    if (quentity != 0)
        product.quentity -= 1
    else {
        basket.products = basket.products.filter(item => !item.product._id.equals(_idProduct))
    }
    console.log(basket.products, "basket.products");
    await basket.save()
    res.json({ message: "product updated" })
}

module.exports = { createNewBasket, addAndUpdate, deleteAndUpdate, getBasket, getById, getAllProducts }


