const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())

app.post('/users', (req, res) => {
    let user = req.body

    fs.readFile('accounts.json', 'utf8', (err, data) => {
        if(!err) {
            try {
                let json = JSON.parse(data)
                user = {id: json.nextId++, ...user}
                json.accounts.push(user)

                fs.writeFile('accounts.json', JSON.stringify(json, null, 2), err => {
                    if(err) {
                        console.log(err)
                    }
                    res.send(json.accounts)
                })
            } catch (error) {
                console.log(`Erro: ${error}`)
            }
        } else {
            console.log('Erro na Leitura')
            res.send('Erro na Leitura')
        }
    })
})

app.listen(3333, () => {
    try {
        fs.readFile('accounts.json', 'utf8', (err, data) => {
            if(err){
                const initialJson = {
                    nextId: 1,
                    accounts: []
                }
                fs.writeFile('accounts.json', JSON.stringify(initialJson), err => {
                    if(err) {
                        console.log(`Write file error: ${err}`)
                    }
                })
            }

        })
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
        
    console.log('Server is running')
})