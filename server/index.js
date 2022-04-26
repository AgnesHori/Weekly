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
app.use(fileUpload({createParentPath:true}))
app.use(morgan('dev'))

app.use('/recipes',recipes)
app.use('/categ',categ)
app.use('/auth',auth)



app.listen(5000,()=>console.log('listening on port 5000...'))