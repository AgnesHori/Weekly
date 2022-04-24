const mysql =require('mysql');
const configDb=require('./configDb')
const db=mysql.createConnection(configDb)
const express=require('express')
const cors=require('cors')

const app=express()
app.use(cors())

app.get('/recipes',(req,res)=>{
    db.query(`select r.recipes_id,r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type, cs.diet
            FROM users u, categ_occ co, categ_types ct, categ_special cs, recipes r WHERE u.user_id=r.user_id
            and co.categ_occ_id=r.categ_occ_id and ct.categ_types_id=r.categ_types_id and
            cs.categ_special_id=r.categ_spec_id`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
})
app.get('/recipes/:id',(req,res)=>{
    const id=req.params.id
    db.query(`select r.recipes_id,r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type, cs.diet
    FROM users u, categ_occ co, categ_types ct, categ_special cs, recipes r WHERE u.user_id=r.user_id
    and co.categ_occ_id=r.categ_occ_id and ct.categ_types_id=r.categ_types_id and
    cs.categ_special_id=r.categ_spec_id and r.recipes_id=${id}`,(err,result)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(result)
            })
})



app.listen(5000,()=>console.log('listening on port 5000...'))