const NhanVien = require('../modals/nhanvien')
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');

class nhanvienController{

    // [get] /news
    
    showLishNhanVien(req,res, next){
        NhanVien.find({})
            // res.json(req.params.id)
            .then(nhanvien => {
                return res.render('nhanvien/listnhanvien',{
                    nhanvien: mutipleMongooseToObject(nhanvien),
                    data: res.data
                });
            })
            .catch(next) 
    }
    create(req,res, next){
        
        return res.render('nhanvien/createnhanvien',{
            data: res.data
        });
        
    }
    edit(req,res, next){
        NhanVien.findById(req.params.id)
            .then(nhanvien => res.render('nhanvien/editNhanvien',{
                nhanvien: MongooseToObject(nhanvien),
                data: res.data
            }))
            .catch(next)
        
    }
    
    store(req,res, next){
        // res.json(req.body);
        // body nhận form từ sever gửi về database
        const nhanvien = new NhanVien(req.body);
        nhanvien.save()
            .then(()=>res.redirect('/nhanvien'))
            .catch(next)
        // res.send(req.body.img)

    }
    update(req,res,next){
        NhanVien.updateOne({_id: req.params.id}, req.body)
            // redirect chuyển sang trang ....
            .then(()=> res.redirect('/nhanvien'))
            .catch(next)
    }
    delete(req,res,next){
        NhanVien.deleteOne({_id: req.params.id})
            // redirect chuyển sang trang ....
            .then(()=> res.redirect('back'))
            .catch(next)
    }
}

module.exports = new nhanvienController();