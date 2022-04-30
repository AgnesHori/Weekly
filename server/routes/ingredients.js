const express=require('express')
const router=express.Router()

const {getAllIngredients}=require('../controllers/ingredients')

router.route('/ingredients').get(getAllIngredients)

module.exports=router
