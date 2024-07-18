import { TEST_API } from '@/app/lib'

export async function GET(request: Request) {
  const res = await fetch(TEST_API, {
    next: { revalidate: 5 },
  })
  const data = await res.json()
  return Response.json(data)
}
