const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)



const getRecipes=(req,res)=>{
    db.query(`SELECT r.recipes_id,r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type, cs.diet,
                r.categ_occ_id, r.categ_types_id, r.categ_spec_id
                FROM recipes r
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id
                LEFT JOIN users u ON u.user_id = r.user_id`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
}


const getRecipe=(req,res)=>{
    const {id}=req.params
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type,cs.diet,r.categ_occ_id, 
                r.categ_types_id, r.categ_spec_id 
                FROM recipes r 
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id 
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id 
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id 
                LEFT JOIN users u ON u.user_id = r.user_id 
                WHERE r.recipes_id =${id}`,(err,result)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(result)
            })
}


const getIngredients=(req,res)=>{
    const {id}=req.params
    db.query(`SELECT ri.amount, i.ingredient,i.measurement from recipes_ingr ri, ingredients i
                WHERE ri.recipes_ingr_id=i.ingr_id
                AND ri.recipes_id=${id}`,(err,result)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(result)
            })
}

const getRecipesFiltered=(req,res)=>{
    const {id}=req.params //categ_occ_id 
    db.query(`SELECT r.recipes_id,r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type, cs.diet, r.categ_occ_id, r.categ_types_id, r.categ_spec_id
                FROM users u, categ_occ co, categ_types ct, categ_special cs, recipes r
                WHERE u.user_id=r.user_id
                AND co.categ_occ_id=r.categ_occ_id and ct.categ_types_id=r.categ_types_id
                AND cs.categ_special_id=r.categ_spec_id
                AND r.categ_occ_id=${id}`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
}

const createRecipe=(req,res)=>{
    console.log(req.body)
    const {title, categ_occ_id,body, user_id}=req.body
    const {image_url}=req.files
    console.log('feltöltött kép:',image_url)
    const fileName=user_id+'-'+image_url.name
    image_url.mv('./public/images/'+fileName)
    let actualDate=new Date()
    actualDate=actualDate.toISOString().split('T')[0] + ' ' + actualDate.toTimeString().split(' ')[0]
    console.log(actualDate)
    db.query('insert into recipes (user_id,title,categ_occ_id,body,image_url,created_at) values (?,?,?,?,?,?)',
        [user_id,title,categ_occ_id,body,fileName,actualDate],
        (err,result)=>{ //vessző után callback fv., megmondjuk, hogy mi történjen az insert után
            if(err){
                console.log('Hiba a beszúrásban:',err)
                res.send({message:`Hiba a feltöltésben:${err}`})
            }
            if(result){
                console.log('Sikeres feltöltés:',result.insertId)
                res.send({message:`Sikeres publikálás!`})
            }
        }
    )
}

const updateRecipe=(req,res) => {
    const {id}=req.params
    console.log('put:',req.body,id,req.params)
    const {title,categ_occ_id,body}=req.body
    let updatedDate=new Date()
    updatedDate=updatedDate.toISOString().split('T')[0] + ' ' + updatedDate.toTimeString().split(' ')[0]
    db.query('update recipes set title=?, categ_occ_id=?, body=?, updated_at=? where recipes_id=?',
        [title,categ_occ_id,body,updatedDate,id],
        (err,result)=>{
            if(err){
                res.send({message:`Az adatok módosítása nem sikerült! - ${err}`})
            }
            if(result){
                res.send({message:`Sikeres módosítás!`})
            }
        }
    )
}

const deleteRecipe=(req,res) => {
    const {id}=req.params
    db.query('DELETE from recipes where recipes_id=?',[id],
        (err,result)=>{
            if(err){
                res.send({message:`A törlés nem sikerült! - ${err}`})
            }
            if(result){
                res.send({message:`Sikeres törlés !`})
            }
        }   
    )
}

const getUserRecipes=(req,res) => {
    const {id}=req.params
    console.log("getUserRecipes", req.params)
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body, u.user_id, u.user_name, co.occasion, ct.type, cs.diet,
                r.categ_occ_id, r.categ_types_id, r.categ_spec_id
                FROM recipes r
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id
                LEFT JOIN users u ON u.user_id = r.user_id
                WHERE u.user_id=${id}`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
                }
            )   
}

const getUserRecipesFiltered=(req,res) => {
    const {categ_id}=req.params //u.user_id
    const {user_id}=req.params //categ_occ_id 
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body, u.user_id, u.user_name, 
                co.occasion, ct.type, cs.diet, r.categ_occ_id, r.categ_types_id, r.categ_spec_id
                FROM recipes r
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id
                LEFT JOIN users u ON u.user_id = r.user_id
                WHERE u.user_id=${user_id} AND co.categ_occ_id=${categ_id}`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })

}

module.exports={getRecipes,getRecipe,getIngredients,getRecipesFiltered,createRecipe,updateRecipe,deleteRecipe,getUserRecipes,getUserRecipesFiltered}