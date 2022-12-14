const {hashPassword,checkPassword} = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../modals/user')

class AuthController{
    login(req,res,next){
        res.render("auth/login",{
            layout:false,
            loginFalied:false
        })
    }
    logout(req,res,next){
        res.clearCookie("token")
        res.redirect("/")
    }
    signup(req,res,next){
        res.render("auth/signup",{
            layout:false,
            data:true
        });
    }

    saveAccount(req,res,next){
        let username = req.body.username.toLowerCase();
        let password = req.body.password
        let email = req.body.email
        const newUser = new user({username:username,password: hashPassword(password),email:email});
        user.findOne({username:username})
        .then(data =>{
            if(data==null){
                newUser.save()
                .then(()=>
                    res.redirect('login')
                    )
                .catch(next)
            }
            else{
                
                res.render('auth/signup',{
                    layout:false,
                    data:false,
                    username:username,
                    password:password,
                })
            }
        })
        .catch(err =>{
            res.json("lỗi sever")
        })
    }

    setLogin(req,res,next){
        let username = req.body.username;
        let password = req.body.password;
        user.findOne({ username: username})
            .then(data=>{

                if(data){
                    if(checkPassword(password,data.password)){
                        
                        let token = jwt.sign({_id:data._id},"mk")
                        res.cookie("token",token,{ maxAge: 9000000, httpOnly: true })
                        // return res.redirect("/private")
                        return res.redirect("/listUsers/users")
                        // return res.json({
                        //         message: "thành công",
                        //         token: token 
                        //     })
                    }
                    else{
                        return res.render("auth/login",{
                            layout: false,
                            loginFalied:true,
                        })
                    }
                }
                else{
                    // return res.redirect("/auth/login")
                    // return res.redirect("/")

                    return res.render("auth/login",{
                        layout: false,
                        loginFalied:true,
                    })
                }

            })
            .catch(err=>{
                res.status(500).json("lỗi sever")
            })
    }

    getuser(req,res,next){
        res.render("auth/user",{
            data:res.data
        })
    }

}

module.exports = new AuthController();