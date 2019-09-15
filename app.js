
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/allwidgets', db.getAllWidgets)
app.get('/widget/:widget_id', db.getWidgetById)
app.post('/insertwidget', db.createWidget)
app.put('/updatewidget/:widget_id', db.updateWidget)
app.delete('/deletewidget/:widget_id', db.deleteWidget)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
