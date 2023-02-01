import { IAuth } from './interfaces'
//import CDomains from './requests/domains'
import CDomains from './requests/client/domains'

class CClient {
  /**
   * Used to make authenticated "Client Domains" requests
   */
  domains: CDomains
  
  constructor(auth: IAuth) {
    if (!auth) {
      throw new Error('Missing authentication.')
    }

    this.domains = new CDomains(auth)
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