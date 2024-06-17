var Compositor = require('../models/compositor');

module.exports.list = () => {
    return Compositor
        .find()
        .exec();
}

module.exports.list = (sort, order) => {
    return Compositor
        .find()
        .exec();
}

module.exports.findById = id => {
    return Compositor
        .findOne({_id: id})
        .exec();
}

module.exports.insert = a => {
    return Compositor.create(a);
}

module.exports.update = (id, a) => {
    return Compositor
        .findOneAndUpdate({_id: id}, a, {new: true})
        .exec();
}

module.exports.remove = id => {
    return Compositor
        .deleteOne({_id: id})
        .exec();
}