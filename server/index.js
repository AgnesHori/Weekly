require('dotenv').config();
const express=require('express')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const morgan = require('morgan')

const recipes=require('./routes/recipes')
const categ=require('./routes/categ')
const auth=require('./routes/auth')
const admin=require('./routes/admin')
const ingredients=require('./routes/ingredients')

const app=express()
app.use(cors())
app.use(express.json())

app.use(express.static("build"))

app.use(fileUpload({useTempFiles:true}))
app.use(morgan('dev'))

app.use('/recipes',recipes)
app.use('/categ',categ)
app.use('/auth',auth)
app.use('/admin',admin)
app.use('/ingredients',ingredients)
//console.log(process.env)


const port=process.env.PORT || 5000

app.listen(port,()=>console.log(`listening on port ${port}...`))