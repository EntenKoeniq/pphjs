import { IAuth } from '../../interfaces'
import { queryBuilder, makeRequest } from '../../helper'

/**
 * This class is used to make authenticated "Client Hostings" requests
 */
export default class {
  protected api_url: String = "https://api.pph.sh/client/hostings"
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

  /**
   * @param status String | null
   * @param active Boolean | null
   * @param ip String | null
   * @param password Boolean | null
   */
  public async all(querys: JSON | null = null): Promise<[JSON | null, Object | null]> {
    let url = ""
    if (querys !== null) {
      url += queryBuilder(querys)
    }
    return this._req(url, "GET")
  }

  /**
   * @param id Number
   */
  public async details(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(id, "GET")
  }

  /**
   * @param id Number
   */
  public async invoices(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/invoices`, "GET")
  }

  /**
   * @param id Number
   * @param apply Boolean
   */
  public async upgrade(id: Number, apply: Boolean): Promise<[JSON | null, Object | null]> {
    let url = `${id}/upgrade`
    if (apply === true) {
      url += "/do"
    }
    return this._req(url, "POST")
  }

  /**
   * @param id Number
   * @param method String | null
   * @param querys JSON | null
   */
  public async cancellation(id: Number, method: String | null = null, querys: JSON | null = null): Promise<[JSON | null, Object | null]> {
    let url = `${id}/cancellation`
    switch (method) {
      case "refund":
        return this._req(`${url}/refund`, "GET")
      case "create":
        if (querys === null) {
          return [null, { status: 0, msg: "missing_querys", error: null }]
        }

        url += "/create" + queryBuilder(querys)

        return this._req(url, "POST")
      case "revoke":
        return this._req(`${url}/revoke`, "POST")
      default:
        return this._req(url, "GET")
    }
  }

  /**
   * @param id Number
   */
  public async features(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/features`, "GET")
  }

  /**
   * @param id Number
   */
  public async actions(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/actions`, "GET")
  }

  /**
   * @param id Number
   * @param action String
   * @param querys JSON | null
   */
  public async action(id: Number, action: String, querys: JSON | null = null): Promise<[JSON | null, Object | null]> {
    let url = `${id}/actions/handle/${action}`
    if (querys !== null) {
      url += queryBuilder(querys)
    }
    switch (action) {
      case "reboot":
      case "stop-server":
      case "start-server":
        return this._req(url, "POST")
      default:
        return this._req(url, "GET")
    }
  }
}