const express=require('express')
const router=express.Router()

const {getAllIngredients}=require('../controllers/ingredients')

router.route('/').get(getAllIngredients)

module.exports=router
