const express=require('express')
const router=express.Router()
const{getRecipes,getRecipe, getIngredients, getRecipesFiltered,createRecipe,updateRecipe,deleteRecipe,getUserRecipes,getUserRecipesFiltered}=require('../controllers/recipes')

router.route('/').get(getRecipes) // a recipes a gyökér könyvtár, az index js-ben megvan a kezdete a route-nak
router.route('/user/:user_id').get(getUserRecipes)
router.route('/:id').get(getRecipe)
router.route('/ingredients/:id').get(getIngredients)
router.route('/categ/:id').get(getRecipesFiltered)
router.route('user/:user_id/categ/:categ_id').get(getUserRecipesFiltered)
router.route('/').post(createRecipe)

router.route('/:id').put(updateRecipe)
router.route('/:id/:imageId').delete(deleteRecipe)


module.exports=router


