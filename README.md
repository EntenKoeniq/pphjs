# pph-js
 
# Example
```js
const pph = require('pphjs')

const client = pph.createClient({ token: "xxx", lang: "de" })

async function main() {
  const [ servers, error ] = await client.domains.whoisServers()
  if (error !== null) {
    console.error(error)
  } else {
    console.log(servers)
    /** RESULT
     * {
     *   data: {
     *     servers: [
     *       [Object], [Object], [Object], [Object],
     *       ... 1125 more items
     *     ]
     *   },
     *   success: true
     * }
     */
  }
}

main().then().catch()
```
