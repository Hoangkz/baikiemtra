
const User = require('../modals/user');
const {MongooseToObject, mutipleMongooseToObject,mongooseToGetLish} = require('../../util/mongoose');

class UserController{

    showLishUser(req,res, next){
        User.find({})
            // res.json(req.params.id)
            .then(user => {
                return res.render('username/users.hbs',{
                    user: mutipleMongooseToObject(user),
                    data: res.data
                });
            })
            .catch(next) 
    }

    //GET /items/store (edit)
    edit(req,res, next){
        User.findById(req.params.id)
            .then(user => res.render('items/edit',{
                user: MongooseToObject(user),
                data: res.data
            }))
            .catch(next)
        
    }
    
    //POST /items/create, tạo database    
    store(req,res, next){
        
        // res.json(req.body);
        // body nhận form từ sever gửi về database
        const user = new User(req.body);
        user.save()
            .then(()=>res.redirect('/me/stored/items'))
            .catch(next)
        // res.send(req.body.img)

    }
    delete(req,res,next){
        User.deleteOne({_id: req.params.id})
            // redirect chuyển sang trang ....
            .then(()=> res.redirect('back'))
            .catch(next)
    }
}
module.exports = new UserController();