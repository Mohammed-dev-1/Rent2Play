const Shop = require('../modules/shop')

const addShop = (req , res, next) => {
    Shop.create(req.body).then(function(shop){
        res.json({
            message: "The shop was added successfully"
        });
    }).catch(next);
}

const shopList = (req, res, next) => {
    Shop.find({}).then(function(shops){
        res.send(shops);
    });
}

const updateShop = (req, res, next) => {
    Shop.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        Shop.findOne({_id: req.params.id}).then(function(shop){
            res.send(shop);
        });
    });
}

const deleteShop = (req, res, next) => {
    Shop.findByIdAndRemove({_id:req.params.id}).then(function(shop){
        res.json({
            message: "The shop was deleted successfully"
        })
    })
}

module.exports = {
    addShop,
    shopList,
    updateShop,
    deleteShop
}