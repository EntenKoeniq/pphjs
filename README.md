<h1 align="center">pphjs</h1>
<div align="center">
 <strong>
   A SDK for Prepaid-Hoster.de
 </strong>
 <p>(This SDK is still under development and is NOT production ready!)</p>
</div>
 
# Example
```js
const pph = require('pphjs')

const client = pph.createClient({ token: "xxx", lang: "de" })

...
const [ servers, error ] = await client.hostings.all()
...
```
