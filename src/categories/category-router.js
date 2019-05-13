'use strict'

const express = require('express')
const Joi = require('@hapi/joi')
const { requireAuth } = require('../middleware/jwt-auth')
const categoryService = require('./category-service')
const xss = require('xss')

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

            const clean = categories.map(c => {

                c.name = xss(c.name);
                c.type = xss(c.type);
                return c;
            });

            res.json(clean)
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
                   return res.status(400).json({errors: [`${fields[i]} is required`]})
                }
            }

            const hasCategory = await categoryService
                .hasCatergoryByUserId(
                    req.app.get('db'),
                    req.user.id,
                    name,
                    type
                )

            if(hasCategory){
                return res.status(400).json({errors: ['Category already exists']})
            }

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
            res.category.name = xss(res.category.name);
            res.category.type = xss(res.category.type);
            res.json(res.category)
            next()
        }catch(error){
            next(error)
        }
    })
    .patch(bodyParser, async(req, res, next) => {
        try{
            const schema = Joi.object({
                name: Joi.string(),
                type: Joi.string(),
                monthly_budget: Joi.number(),
            })

            const validation = Joi.validate(req.body, schema)

            if(validation.error) {
                const errorStrings = validation.error.details.map(err => {
                    return err.message;
                })
                return res.status(400).json({ errors: errorStrings });
            }

            const updatedCategory = await categoryService
                .updateCategory(
                    req.app.get('db'),
                    validation.value,
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
            const incomesForCategory = await categoryService
                .getIncomesByCategoryId(
                    req.app.get('db'),
                    req.params.id,
                    req.user.id
                )
            const expensesForCategory = await categoryService
                    .getExpensesByCategoryId(
                        req.app.get('db'),
                        req.params.id,
                        req.user.id
                    )

            if(incomesForCategory || expensesForCategory){
                return res.status(400).json({ errors: ['Category not empty']})
            }
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
            return res.status(404).json({errors: [`Category doesn't exist`]})
        }

        const category = await categoryService
            .getCategoryById(
                req.app.get('db'),
                id,
                req.user.id
            )

        if(!category){
            return res
                .status(404)
                .json({errors: [`Category doesn't exist`]})
        }
        res.category = category
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = categoryRouter
