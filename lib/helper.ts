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

export function queryBuilder(querys: JSON): String {
  let result: String = "?"
  let first_query: Boolean = true
  Object.entries(querys).forEach(([key, value]) => {
    if (first_query === true) {
      first_query = false
    } else {
      result += '&'
    }
    result += `${key}=${value}`
  })
  return result
}