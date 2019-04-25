const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const categoryService = require('./category-service')

const categoryRouter = express.Router()
const bodyParser = express.json()


categoryRouter
    .route('/')
    .all(requireAuth)
    .get(async(req, res, next) => {
        try{
            const categories = await categoryService
                .getAllCategoriesByUserId(
                    req.app.get('db'), 
                    req.user.id
                )

            if(categories.length === 0){
                return res.status(404).json({
                    errors: [`No categories found`],
                })
            }

            res.json(categories)
            next()
        } catch(error) {
            next(error)
        }
    })
    .post(bodyParser, async(req, res, next) => {
        try{
            const { name, type, monthly_budget} = req.body
            const fields = ['name', 'type']
            const newCategory = {
                owner_id: req.user.id,
                name,
                type,
                monthly_budget
            }
    
            for(let i=0; i<fields.length; i++){
                if(!req.body[fields[i]]){
                   return res.status(400).json({errors: [`Missing ${fields[i]} in request body`]})
                }
            }
    
            // newCategory[owner_id] = req.user.id

            const category = await categoryService
                .insertCategory(
                    req.app.get('db'), 
                    newCategory
                )

            res.status(201).json(category)
            next()
        } catch(error){
            next(error)
        }
    })

categoryRouter
    .route('/:id')
    .all(requireAuth)
    .all(isCategoryExist)
    .get(async(req, res, next) => {
        try{
            res.json(res.category)
            next()
        }catch(error){
            next(error)
        }
    })
    .patch(bodyParser, async(req, res, next) => {
        try{
            // const keys = ['name', 'type', 'monthly_budget']
            // if(!req.body.name && !req.body.type && !req.body.monthly_budget){
            //     return res.status(400).json({errors: ['Bad Reguest']})
            // }
            const updatedCategory = await categoryService
                .updateCategory(
                    req.app.get('db'),
                    req.body,
                    req.params.id
                )
            
            if(!updatedCategory){
                return res.status(500).end()
            }

            res.status(204).end()
        }catch(error){
            next(error)
        }
    })
    .delete(async(req, res, next) => {
        try{
            await categoryService
                .deleteCategory(
                    req.app.get('db'), 
                    req.params.id
                )

            res.status(204).end()
            next()  
        }catch(error){
            next(error)
        }
    })


async function isCategoryExist(req, res, next){
    try{
        const id = req.params.id
        if(isNaN(parseInt(id, 10))){
            return res.status(404).json({errors: ['Not a number']})
        }

        const category = await categoryService
            .getCategoryById(
                req.app.get('db'),
                id,
                req.user.id
            )
        
        if(!category){
            return res
                .status(400)
                .json({errors: [`Category doesn't exist`]})
        }
        res.category = category
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = categoryRouter