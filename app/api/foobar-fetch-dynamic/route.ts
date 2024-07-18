import { TEST_API } from '@/app/lib'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const res = await fetch(TEST_API)
  const data = await res.json()
  return Response.json(data)
}
