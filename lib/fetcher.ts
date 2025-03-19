export async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Request failed with status")
    return response.json()
}