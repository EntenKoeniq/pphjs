import { IAuth } from '../interfaces'
import { makeGetRequest } from '../helper'

/**
 * This class is used to make "Domains" requests
 */
export default class {
  protected api_url: String = "https://api.pph.sh/public/domains"
  protected auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  async _get(url_ending: String): Promise<[JSON | null, Object | null]> {
    let response: Response
    let result: JSON
    try {
      response = await makeGetRequest(`${this.api_url}/${url_ending}`, this.auth.token, this.auth.lang)
    } catch (e) {
      return [null, { status: 0, msg: "request_failed", error: e }]
    }

    if (response.status !== 200) {
      return [null, { status: response.status, msg: "wrong_status", error: null }]
    }

    result = await response.json()
    return [result, null]
  }

  /**
   * @param tld 
   * @returns Returns a list of TLDs and their whois servers
   */
  public async whoisServers(tld: String | null): Promise<[JSON | null, Object | null]> {
    let url: String = "whois-servers"
    if (tld !== null) {
      url += `?tld=${tld}`
    }
    return this._get(url)
  }

  /**
   * @param tld 
   * @returns 
   */
  public async tldInfo(tld: String): Promise<[JSON | null, Object | null]> {
    return this._get(`tld-info/${tld}`)
  }

  /**
   * @returns Returns a list of available top level domains
   */
  public async extensions(): Promise<[JSON | null, Object | null]> {
    return this._get("extensions")
  }

  /**
   * @param tld 
   * @returns Returns a list of available top level domains
   */
  public async extensionsTld(tld: String): Promise<[JSON | null, Object | null]> {
    return this._get(`extensions/${tld}`)
  }

  /**
   * `page` is only applied if query is set
   * @param query The domain to search. Example: domain.com
   * @param page The page. Example: 1
   * @returns Returns simple information about a domain inquiry
   */
  public async search(query: String | null, page: Number | null): Promise<[JSON | null, Object | null]> {
    let url: String = "search"
    if (query !== null) {
      url += `?query=${query}`

      if (page !== null) {
        url += `&page=${page}`
      }
    }
    return this._get(url)
  }

  /**
   * @param query The domain to check the availability for. Example: domain.com
   * @returns Returns information about the availability of a single domain
   */
  public async check(query: String | null): Promise<[JSON | null, Object | null]> {
    let url: String = "check"
    if (query !== null) {
      url += `?query=${query}`
    }
    return this._get(url)
  }
}