const NhanVien = require('../modals/nhanvien')
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');

class nhanvienController{

    // [get] /news
    index(req, res, next) {
        NhanVien.find({})
            .then(nhanvien => {
                return res.json(mongooseToGetLish(nhanvien));
                // return res.send(item);
            })
            .catch(()=> res.redirect('back'))
    }
    create(req,res, next){
        
        return res.render('createnhanvien',{
            data: res.data
        });
        
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
}

module.exports = new nhanvienController();