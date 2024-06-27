const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)

const getUsers=(req,res) => {
    console.log('getUsers')
    db.query(`SELECT * FROM users`,(err,results)=>{
        if(err) 
            console.log(err)
        else
            res.status(200).send(results)
        })
}

const deleteUser=(req,res) => {
    const {id}=req.params
    console.log(id)
    db.query(`delete from recipes_ingr where recipes_id=(select recipes_id from recipes where user_id=${id})`,
    (err,result)=>{
        if(err){
            res.send({message:`Nem sikerült a hozzávalókból a törlés - ${err}`})
    }})
    db.query(`DELETE from recipes where user_id=${id}`,
    (err,result)=>{
        if(err){
            res.send({message:`A törlés nem sikerült a receptekből! - ${err}`})
        }
        if(result){
           db.query(`DELETE from users where user_id=${id}`,
                (err,result)=>{
                    if(err){
                        res.send({message:`A törlés nem sikerült! - ${err}`})
                    }
                    if(result){
                        res.send({message:`Sikeres törlés!`})
                    }
                }   
                )
                }
            }   
            )

}


module.exports={getUsers,deleteUser}