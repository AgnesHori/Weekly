const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)
const {myToken}=require('../model/token')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const bcrypt = require('bcryptjs')
const saltRounds=10

const register=(req,res)=>{
    console.log('post kérés',req.body)
    const {user_name,email,password}=req.body
    bcrypt.hash(password,saltRounds,(err,hashedPw)=>{
        if(err) console.log(err)
        const regDate=new Date()
        const regDateStr=regDate.getFullYear()+'.'+(regDate.getMonth()+1)+'.'+regDate.getDate()
        const token=myToken()
        console.log(user_name)
        db.query(`insert into users (user_name, email, password, created_at, status, role, confirmationCode) values (?,?,?,?,?,?,?)`,
        [user_name, email, hashedPw, regDateStr, 'pending', 'user', token],(err,result)=>{
            if(err){
                console.log('insert error:',err)
                res.send({message:`Error in insert:${err}`})
            }
            if(result){
                console.log('Sikeres beszúrás',result.insertId)
                const msg = {
                    to: email,
                    from: process.env.VERIFIED_EMAIL, 
                    subject: 'Regisztráció aktiválása ',
                    text: 'Kattints az aktiváló linkre!',
                    html: `<p>Fiókod aktiválásához kattints ide: <strong><a href="https://weeklyrecipes.herokuapp.com/#/confirm/
                    ${token}">Aktiválás</a></strong>`,
                  };
                  (async () => {
                    try {
                      await sgMail.send(msg);
                    } catch (error) {
                      console.error(error);
                      if (error.response) {
                        console.error(error.response.body)
                      }
                    }
                  })();
                res.send({message:`Kattintson az emailben érkezett linkre a regisztráció aktiválásához!`})
            }
        })
    })
}


const login=(req,res)=>{
    console.log('post....',req.body)
    const {email,password} =  req.body
    db.query('select user_id,password,user_name,role,status from users where email=?',[email],(err,result) => {
        if(err)
            res.send({"error":err})
        if(result.length==1){
            bcrypt.compare(password,result[0].password,
                (error,resultCompare) => {
                    if(resultCompare)
                        if(result[0].status=='active')
                            res.send({message:"Sikeres bejelentkezés!", username:result[0].user_name,userId:result[0].user_id,role:result[0].role})
                        else
                            res.status(401).send({message:"Bejelentkezés előtt aktiváld a regisztárciód az emailben küldött linken!"})
                    else
                        res.status(401).send({message:"Hibás email cím / jelszó páros!"})
                })
         }else
            res.status(401).send({message:"Nem létező email cím!"})
    })
}


const checkUsername=(req,res)=>{
    console.log('post....',req.body)
    const {user_name} = req.body
    db.query('select count(*) nr from users where user_name=?',[user_name],(err,result) => {
        res.send(result)
    })
}


const checkEmail=(req,res)=>{
    console.log('post....',req.body)
    const {email} = req.body
    db.query('select count(*) nr from users where email=?',[email],(err,result) => {
        res.send(result)
    })
}

const verifyUser=(req,res)=>{
    console.log('verify user')
    const confirmationCode= req.params.confirmationCode
    db.query('SELECT count(*) nr from users where confirmationCode=?',[confirmationCode], (error, results)=> {
        if(error)
            res.status(404).send({message:`Error-activation failed:${error}`})
        if(results.nr===0)
            res.status(404).send({ message: "User Not found." });
        //pending->active
        db.query('update users set status=? where confirmationCode=?',['active',confirmationCode],(err,result)=>{    
            if(err){
                console.log(`Error-activation failed:${err}`)
                res.send({message:`Error-activation failed:${err}`})
            }
            if(result){
                console.log('Sikeres fiók aktiválás!')
                res.send({message:"Sikeres fiók aktiválás!"})  
            }
        })     
    });
}


module.exports={login,register,checkUsername,checkEmail,verifyUser}