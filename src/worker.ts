export default {
  async fetch(request: Request, env: Record<string, unknown>): Promise<Response> {
    const url = new URL(request.url)
    const ASSETS = env.ASSETS as { fetch: (req: Request) => Promise<Response> }

    if (/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(url.pathname)) {
      return ASSETS.fetch(request)
    }

    return ASSETS.fetch(new Request(new URL('/', request.url), request))
  },
}
