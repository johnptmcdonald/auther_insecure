const app = require('./app')
const db = require('./db')

const port = 8080
const server = app.listen(port, (err) => {
  if (err) throw err
  console.log('HTTP server patiently listening on port', port)
  db.sync()
    .then(() => {
      console.log('Oh and btw the postgres server is totally connected, too')
    })
})

module.exports = server
