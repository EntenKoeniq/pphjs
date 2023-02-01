export async function makeGetRequest(url: String, token: String, lang: String | null): Promise<Response> {
  return await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": `${lang}`
    }
  })
}