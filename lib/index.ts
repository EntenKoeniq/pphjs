import { IAuth } from './interfaces'
//import CDomains from './requests/domains'
import CDomains from './requests/client/domains'
import CHosting from './requests/client/hosting'

const SUPPORTED_LANGUAGES: Array<String> = [
  "de",
  "en"
]

class CClient {
  domains: CDomains
  hosting: CHosting
  
  constructor(auth: IAuth) {
    if (typeof auth.token === 'undefined') {
      throw new Error('Missing authentication')
    }
    if (typeof auth.lang === 'undefined') {
      auth.lang = "en"
    } else if (SUPPORTED_LANGUAGES.includes(`${auth.lang.toLocaleLowerCase()}`) === false) {
      throw new Error('This language is not supported')
    }

    this.domains = new CDomains(auth)
    this.hosting = new CHosting(auth)
  }
}

/**
 * Create a new client for requests
 * @param auth An interface with details to make requests
 * @returns A client class
 */
export function createClient(auth: IAuth): CClient {
  return new CClient(auth)
}