import { IAuth } from '../../interfaces'
import { makeGetRequest } from '../../helper'

/**
 * This class is used to make authenticated "Client Domains" requests
 */
export default class CDomains {
  protected api_url: String = "https://api.pph.sh/client/domains"
  protected auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  async _get(url_ending: String | null): Promise<[JSON | null, Object | null]> {
    let url: String = this.api_url
    if (url_ending !== null) {
      url += '/' + url_ending
    }
    let response: Response
    let result: JSON
    try {
      response = await makeGetRequest(`${url}`, this.auth.token, this.auth.lang)
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
    return this._get(null)
  }

  public async single(id: Number): Promise<[JSON | null, Object | null]> {
    return this._get(id.toString())
  }
}