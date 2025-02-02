import { TEST_API } from '@/app/lib'

export async function GET(request: Request) {
  const res = await fetch(TEST_API)
  const data = await res.json()
  return Response.json(data)
}

export async function POST(request: Request) {
  const res = await fetch(TEST_API)
  const data = await res.json()
  return Response.json(data)
}
