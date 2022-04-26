const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)



const getCateg=(req,res)=>{
    db.query(`select categ_occ_id,occasion from categ_occ`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
}

module.exports={getCateg}