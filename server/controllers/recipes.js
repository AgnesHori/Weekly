const mysql =require('mysql');
const configDb=require('../configDB')
const db=mysql.createConnection(configDb)
const cloudinary = require('cloudinary').v2;
const {upload} = require('../cloudinay')



const getRecipes=(req,res)=>{
    db.query(`SELECT r.recipes_id,r.title,r.image_url,r.body,image_id, u.user_name, co.occasion, ct.type, cs.diet,
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
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body,r.image_id, u.user_name, co.occasion, ct.type,cs.diet,r.categ_occ_id, 
                r.categ_types_id, r.categ_spec_id 
                FROM recipes r 
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id 
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id 
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id 
                LEFT JOIN users u ON u.user_id = r.user_id 
                WHERE r.recipes_id=${id}`,(err,result)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(result)
            })
}


const getIngredients=(req,res)=>{
    const {id}=req.params
    console.log('recept id',id)
    db.query(`SELECT ri.amount, i.ingredient,i.measurement from recipes_ingr ri, ingredients i
                WHERE ri.ingr_id=i.ingr_id
                AND ri.recipes_id=${id}`,(err,result)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(result)
            })
}



const getRecipesFiltered=(req,res)=>{
    const {id}=req.params //categ_occ_id 
    db.query(`SELECT r.recipes_id, r.title,r.image_url,r.body, u.user_name, co.occasion, ct.type, cs.diet, r.categ_occ_id, r.categ_types_id, r.categ_spec_id 
                FROM recipes r
                left join categ_occ co ON r.categ_occ_id = co.categ_occ_id
                left join categ_types ct ON ct.categ_types_id = r.categ_types_id
                left join categ_special cs ON cs.categ_special_id = r.categ_spec_id
                left join users u ON u.user_id = r.user_id
                where r.categ_occ_id =${id}`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
            })
}

const createRecipe=async (req,res)=>{
    console.log(req.body)
    const {title, categ_occ_id,body, user_id,inglist}=req.body
    for (let obj of JSON.parse(inglist))
    console.log(obj)
    const {image_url}=req.files
    const fileTypes=['image/jpeg','image/png','image/jpg']
    const fileSize=1024
    if(!fileTypes.includes(image_url.mimetype)) return res.send('Image format not supported: jpg, png, jpeg');
    if(image_url.size/1024>fileSize) return res.send(`Image should be less than ${fileSize}kb`)
    const cloudFile=await upload(image_url.tempFilePath)
    console.log(cloudFile)
    let actualDate=new Date()
    actualDate=actualDate.toISOString().split('T')[0] + ' ' + actualDate.toTimeString().split(' ')[0]
    console.log(actualDate)
    db.query('insert into recipes (user_id,title,categ_occ_id,body,image_url,created_at,image_id) values (?,?,?,?,?,?,?)',
        [user_id,title,categ_occ_id,body,cloudFile.url,actualDate,cloudFile.public_id],
        (err,result)=>{ 
            if(err){
                console.log('Hiba a beszúrásban:',err)
                res.send({message:`Hiba a feltöltésben:${err}`})
            }
            if(result){
                console.log('Sikeres feltöltés:',result.insertId)
                let sql=''
                for (let obj of JSON.parse(inglist))
                    sql+=`insert into recipes_ingr (ingr_id,recipes_id,amount) values (${obj.ing}, ${result.insertId},${obj.amount});`
                db.query(sql,(err,result)=>{
                    if(err)
                        console.log('hiba a hozzávalók beszúrásában',err)
                    if(result)
                        res.send({message:`Sikeres publikálás!`})
                }
                )

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
    const {id,imageId}=req.params
    cloudinary.uploader.destroy(imageId)
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
    const {user_id}=req.params
    console.log("getUserRecipes", req.params)
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body,r.image_id, u.user_id, u.user_name, co.occasion, ct.type, cs.diet,
                r.categ_occ_id, r.categ_types_id, r.categ_spec_id
                FROM recipes r
                LEFT JOIN categ_occ co ON r.categ_occ_id = co.categ_occ_id
                LEFT JOIN categ_types ct ON ct.categ_types_id = r.categ_types_id
                LEFT JOIN categ_special cs ON cs.categ_special_id = r.categ_spec_id
                LEFT JOIN users u ON u.user_id = r.user_id
                WHERE u.user_id=${user_id}`,(err,results)=>{
                if(err) 
                    console.log(err)
                else
                    res.status(200).send(results)
                }
            )   
}

const getUserRecipesFiltered=(req,res) => {
    const {categ_id,user_id}=req.params //categ_occ_id, user_id
    console.log('myrecipe:',req.params)
    db.query(`SELECT r.user_id, r.recipes_id,r.title,r.image_url,r.body,r.image_id, u.user_id, u.user_name, 
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