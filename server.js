
const express = require('express')
const app = express()
const port = 8081 //AWS specific

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))