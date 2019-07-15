const express = require('express')
const app = express()


app.use(express.static('./dist'))
app.get('/api/me', (req, res) => {
  res.json({
    name: '김정환'
  })
})

app.listen(3000, () => {
  console.log('Server is running on 3000')
})
