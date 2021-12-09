const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const itemSchema = require('./itemSchema');

const logSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [String] 
})

module.exports = mongoose.model('Log', logSchema);