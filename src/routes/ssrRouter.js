const express = require('express')
const {PrismaClient} = require('@prisma/client')
const client = new PrismaClient()
const fs = require('fs/promises')

const router = express()

router.get("/", async (req, res)=> {
    const file = await fs.readFile("src/html/index.html")
    res.end(file)
})

router.post("/", async (req, res)=> {
    const results = await client.book.findUnique({
        where: {
            ISBN: req.body.isbn
        }
    })

    if(!results) {
        const results = await client.book.create({
            data: {
                ISBN: req.body.isbn,
                Title: req.body.title,
                Author: req.body.author
            }
        })

        console.log(results)
        
        res.redirect("/")
    }
    else {
        res.json({error: "znaleziono ten ten sam isbn"})
        res.statusCode = 422
    }    
})

module.exports = {
    router: router
}