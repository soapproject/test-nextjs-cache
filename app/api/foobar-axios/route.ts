import { TEST_API } from '@/app/lib'
import axios from 'axios'

export async function GET(request: Request) {
  const res = await axios(TEST_API)
  const data = res.data
  return Response.json(data)
}
