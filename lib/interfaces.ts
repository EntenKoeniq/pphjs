import { ELang } from "./enums"

export interface IAuth {
  /**
   * This is the authentication token for requests
   */
  token: string,
  /**
   * The preferred language.
   * Supported: `de` and `en`
   */
  lang: ELang
}