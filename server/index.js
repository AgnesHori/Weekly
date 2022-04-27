<<<<<<< HEAD
require('dotenv').config();
const express=require('express')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const morgan = require('morgan')

const recipes=require('./routes/recipes')
const categ=require('./routes/categ')
const auth=require('./routes/auth')

const app=express()
app.use(cors())
app.use(express.json())

app.use(express.static("build"))

app.use(fileUpload({useTempFiles:true}))
app.use(morgan('dev'))

app.use('/recipes',recipes)
app.use('/categ',categ)
app.use('/auth',auth)
//console.log(process.env)


const port=process.env.PORT || 5000

app.listen(port,()=>console.log(`listening on port ${port}...`))
=======
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
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
