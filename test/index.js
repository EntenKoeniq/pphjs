const pph = require('../')

const client = pph.createClient({ token: "xxx", lang: "tt" })

async function main() {
  const [ servers, error ] = await client.domains.whoisServers("de")
  if (error !== null) {
    console.error(error)
  } else {
    console.log(servers)
  }
}

main().then().catch()