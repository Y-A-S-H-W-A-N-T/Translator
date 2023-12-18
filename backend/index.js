const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors({ origin: true }))

const { Configuration, OpenAIApi } = require('openai')

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

app.post('/speech',async(req,res)=>{
    const { prompt } = req.body

    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 512,
        temperature: 0,
        prompt: prompt
    })
    res.send(completion.data.choices[0].text)
})

