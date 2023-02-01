import { IAuth } from '../interfaces'
import { makeGetRequest } from '../helper'

/**
 * This class is used to make "Domains" requests
 */
export class CDomains {
  protected api_url: String = "https://api.pph.sh/public/domains"
  protected auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  /**
   * Returns a list of TLDs and their whois servers
   * @returns [JSON | null, Object | null]
   */
  public async whoisServers(): Promise<[JSON | null, Object | null]> {
    let response: Response
    let result: JSON
    try {
      response = await makeGetRequest(`${this.api_url}/whois-servers`, this.auth.token, this.auth.lang)
    } catch (e) {
      return [null, { status: 0, msg: "request_failed", error: e }]
    }

    if (response.status !== 200) {
      return [null, { status: response.status, msg: "wrong_status", error: null }]
    }

    result = await response.json()
    return [result, null]
  }
}