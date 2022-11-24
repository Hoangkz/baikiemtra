const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// soft delete
const mongooseDelete = require('mongoose-delete');

const nhanvien = new Schema({
  hoten: {type: String, required: true},
  quequan: {type: String},
  phongban: {type: String},
  chucvu: {type: String}

},{
  timestamps: true,
});

// add plugin methods
// { overrideMethods: 'all' } chọn cái k có delete true
mongoose.plugin(slug);
nhanvien.plugin(mongooseDelete, {
      deletedAt : true,
      overrideMethods: 'all' 
    });

module.exports = mongoose.model('nhanvien',nhanvien)