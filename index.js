// require your server and launch it here

const server = require('./api/server');

server.listen(9999, () => {
  console.log(`\n*** Server Running on http://localhost:9999 ***\n`)
})
