'use server'

import axios from 'axios'
import { TEST_API } from '../lib'

export async function foobarAction() {
  const res = await fetch(TEST_API)
  const data = await res.json()
  return data
}

export async function foobarAxiosAction() {
  const res = await axios(TEST_API)
  const data = res.data
  return data
}
