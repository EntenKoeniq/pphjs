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
    let result: JSON | null = null
    try {
      response = await makeRequest(url, method, this.auth.token, this.auth.lang)
      result = await response.json()
    } catch (e) {
      return [null, { status: 0, msg: "request_failed", body: result, error: e }]
    }

    if (response.status !== 200) {
      return [null, { status: response.status, msg: "wrong_status", body: result, error: null }]
    }

    return [result, null]
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#list-hostings) for more details.
   * @param querys Array<String> | null: **Example** `["active=true"]`
   */
  public async all(querys: Array<String> | null = null): Promise<[JSON | null, Object | null]> {
    let url: String | null = null
    if (querys !== null) {
      url = queryBuilder(querys)
    }
    return this._req(url, "GET")
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#hosting-details) for more details.
   * @param id Number
   */
  public async details(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(id, "GET")
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#hosting-invoices) for more details.
   * @param id Number
   */
  public async invoices(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/invoices`, "GET")
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#hosting-config-change) for more details.
   * 
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#apply-hosting-config-change) for more details.
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
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#get-cancellation) for more details.
   * 
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#immediate-cancellation-info) for more details.
   * 
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#create-a-cancellation) for more details.
   * 
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#revoke-cancellation) for more details.
   * @param id Number
   * @param method String | null: `refund`, `create`, `revoke` or `null`
   * @param querys Array<String> | null: **Example** `["immediate=true"]`
   */
  public async cancellation(id: Number, method: String | null = null, querys: Array<String> | null = null): Promise<[JSON | null, Object | null]> {
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
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#get-hosting-features) for more details.
   * @param id Number
   */
  public async features(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/features`, "GET")
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#get-hosting-actions) for more details.
   * @param id Number
   */
  public async actions(id: Number): Promise<[JSON | null, Object | null]> {
    return this._req(`${id}/actions`, "GET")
  }

  /**
   * Check out the [API](https://fsn-01.api.pph.sh/new-docs/client-hosting.html#execute-an-action-on-the-hosting) for more details.
   * @param id Number
   * @param action String: `reboot`, `stop-server`, `start-server`, `available-updates`, `backups`, `stats_history`, `ping`, `status`, `traffic`, `live` or `configuration`
   * @param querys Array<String> | null: **Example** `["methods=cpu-usage"]`
   */
  public async action(id: Number, action: String, querys: Array<String> | null = null): Promise<[JSON | null, Object | null]> {
    let url = `${id}/actions/handle/${action}`
    if (querys !== null) {
      url += queryBuilder(querys)
    }
    console.log(url)
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