import { IAuth } from '../../interfaces'
import { makeRequest } from '../../helper'

/**
 * This class is used to make authenticated "Client Domains" requests
 */
export default class {
  protected api_url: String = "https://api.pph.sh/client/domains"
  protected auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  async _req(url_ending: String | Number | null = null, method: String): Promise<[JSON | null, Object | null]> {
    let url: String = this.api_url
    if (url_ending !== null) {
      url += `/${url_ending}`
    }
    let response: Response
    let result: JSON
    try {
      response = await makeRequest(url, method, this.auth.token, this.auth.lang)
    } catch (e) {
      return [null, { status: 0, msg: "request_failed", error: e }]
    }

    if (response.status !== 200) {
      return [null, { status: response.status, msg: "wrong_status", error: null }]
    }

    result = await response.json()
    return [result, null]
  }

  public async all(): Promise<[JSON | null, Object | null]> {
    return this._req(null, "GET")
  }

  public async single(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(id, "GET")
  }

  public async invoices(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/invoices`, "GET")
  }

  /* STOPPED HERE DUE TO API BUG */
}