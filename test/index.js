require('dotenv').config()
const pph = require('../')

const client = pph.createClient({ token: process.env.TOKEN, lang: process.env.LANGUAGE })

async function main() {
  const [ servers, error ] = await client.hostings.all({ active: true })
  if (error !== null) {
    console.error(error)
  } else {
    console.log(servers)
  }
}

main().then().catch()