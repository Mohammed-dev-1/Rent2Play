const Coach = require('../modules/coach')

// Add a Coach
const addCoach = (req, res, next) => {
    Coach.create(req.body).then(function(coach){
        res.json({
            message: "The court was added successfully"
        });
    }).catch(next);
}

const getCoach = (req, res, next) => {
    Coach.find({}).then(function(coachs){
        res.send(coachs);
    });
}

const updateCoach = (req, res, next) => {
    Coach.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        Coach.findOne({_id:req.params.id}).then(function(coach){
            res.send(coach);
        })
    });
}

const deleteCoach = (req, res, next) => {
    Coach.findByIdAndRemove({_id:req.params.id}).then(function(coach){
        res.json({
            message: "The court was deleted successfully"
        }); 
    });
}


module.exports = {
    addCoach,
    getCoach,
    updateCoach,
    deleteCoach
};