export async function makeRequest(url: String, method: String, token: String, lang: String | null): Promise<Response> {
  return await fetch(`${url}`, {
    method: `${method}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": `${lang}`
    }
  })
}

export function queryBuilder(querys: Array<String>): String {
  let result: String = "?"
  result += querys.join('&')
  return result
}