import { IAuth } from '../../interfaces'
import { queryBuilder, makeGetRequest } from '../../helper'

/**
 * This class is used to make authenticated "Client Hostings" requests
 */
export default class {
  protected api_url: String = "https://api.pph.sh/client/hostings"
  protected auth: IAuth

  constructor(auth: IAuth) {
    this.auth = auth
  }

  async _get(url_ending: String | Number | null = null): Promise<[JSON | null, Object | null]> {
    let url: String = this.api_url
    if (url_ending !== null) {
      url += `/${url_ending}`
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

  /**
   * @param status String
   * @param active Boolean
   * @param ip String
   * @param password Boolean
   */
  public async all(querys: JSON | null = null): Promise<[JSON | null, Object | null]> {
    let url = ""
    if (querys !== null) {
      url += queryBuilder(querys)
    }
    return this._get(url)
  }
}