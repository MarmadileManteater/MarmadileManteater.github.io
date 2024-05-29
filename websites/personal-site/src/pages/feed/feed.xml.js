import { getSocialFeed } from "@marmadilemanteater/dataservice/social-posts";


export async function GET(context) {
  const feed = await getSocialFeed(`${context.url.protocol}//${context.url.host}/`)
  return new Response(feed, { 
      headers: {
      'content-type': 'text/xml'
    }
  })
}
