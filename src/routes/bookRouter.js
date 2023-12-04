const express = require('express')
const {PrismaClient} = require('@prisma/client')
const client = new PrismaClient()

const router = express()

router.get("/", async (req, res)=> {
    const results = await client.book.findMany()
    res.json(results)
})

router.get("/:isbn", async (req, res)=> {
    const results = await client.book.findUnique({
        where: {
            ISBN: req.params.isbn
        }
    })

    if(!results) {
        res.json({error:"errorrrito"})
        res.statusCode = 404
    }
    else {
        res.json(results)
    }    
})

module.exports = {
    router: router
}