const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)



const getAllIngredients=(req,res)=>{
    console.log('GetIngr')
    db.query(`SELECT * FROM ingredients`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
}


module.exports={getAllIngredients}
