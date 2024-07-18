'use client'

import axios from 'axios'
import { useCallback, useMemo, useState, type HTMLAttributes } from 'react'
import useSWR from 'swr'
import { foobarAction, foobarAxiosAction } from './action'

const useFetch = (url: string) => {
  const [result, setResult] = useState('')

  const get = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setResult(data.foo)
    return data.foo
  }

  return { caller: get, result }
}

const useServerAction = (action: () => Promise<any>) => {
  const [result, setResult] = useState('')

  const get = async () => {
    const data = await action()
    setResult(data.foo)
    return data.foo
  }

  return { caller: get, result }
}

const useAxios = (url: string) => {
  const [result, setResult] = useState('')

  const get = async () => {
    const res = await axios(url)
    const data = res.data
    setResult(data.foo)
    return data.foo
  }

  return { caller: get, result }
}

const useCustomSWR = (key: string, action: () => Promise<any>) => {
  const { data, mutate } = useSWR(key, () => action(), {
    revalidateOnMount: false,
  })
  return { caller: mutate, result: data }
}

const useTestCases = () => {
  // fetch
  const fetchFetch = useFetch('/api/foobar-fetch')
  const fetchFetchRevalidate = useFetch('/api/foobar-fetch-revalidate')
  const fetchFetchDynamic = useFetch('/api/foobar-fetch-dynamic')
  const fetchAxios = useFetch('/api/foobar-axios')
  // axios
  const axiosFetch = useAxios('/api/foobar-fetch')
  const axiosFetchRevalidate = useAxios('/api/foobar-fetch-revalidate')
  const axiosFetchDynamic = useAxios('/api/foobar-fetch-dynamic')
  const axiosAxios = useAxios('/api/foobar-axios')
  // swr client fetch
  const swrFetchFetch = useCustomSWR('swrFetchFetch', fetchFetch.caller)
  const swrFetchFetchRevalidate = useCustomSWR(
    'swrFetchFetchRevalidate',
    fetchFetchRevalidate.caller
  )
  const swrFetchFetchDynamic = useCustomSWR(
    'swrFetchFetchDynamic',
    fetchFetchDynamic.caller
  )
  const swrFetchAxios = useCustomSWR('swrFetchAxios', fetchAxios.caller)
  // swr client axios
  const swrAxiosFetch = useCustomSWR('swrAxiosFetch', axiosFetch.caller)
  const swrAxiosFetchRevalidate = useCustomSWR(
    'swrAxiosFetchRevalidate',
    axiosFetchRevalidate.caller
  )
  const swrAxiosFetchDynamic = useCustomSWR(
    'swrAxiosFetchDynamic',
    axiosFetchDynamic.caller
  )
  const swrAxiosAxios = useCustomSWR('swrAxiosAxios', axiosAxios.caller)
  // server action
  const serverAction = useServerAction(foobarAction)
  const axiosServerAction = useServerAction(foobarAxiosAction)

  const testCases = useMemo(
    () => [
      // fetch
      {
        title: 'client fetch - server fetch(force-dynamic)',
        handler: fetchFetchDynamic,
      },
      {
        title: 'client fetch - server fetch(revalidate every 5s)',
        handler: fetchFetchRevalidate,
      },
      {
        title: 'client fetch - server fetch',
        handler: fetchFetch,
      },
      {
        title: 'client fetch - server axios',
        handler: fetchAxios,
      },
      // axios
      {
        title: 'client axios - server fetch(force-dynamic)',
        handler: axiosFetchDynamic,
      },
      {
        title: 'client axios - server fetch(revalidate every 5s)',
        handler: axiosFetchRevalidate,
      },
      {
        title: 'client axios - server fetch',
        handler: axiosFetch,
      },
      {
        title: 'client axios - server axios',
        handler: axiosAxios,
      },
      // swr client fetch
      {
        title: 'SWR client fetch - server fetch(force-dynamic)',
        handler: swrFetchFetchDynamic,
      },
      {
        title: 'SWR client fetch - server fetch(revalidate every 5s)',
        handler: swrFetchFetchRevalidate,
      },
      {
        title: 'SWR client fetch - server fetch',
        handler: swrFetchFetch,
      },
      {
        title: 'SWR client fetch - server axios',
        handler: swrFetchAxios,
      },
      // swr client axios
      {
        title: 'SWR client axios - server fetch(force-dynamic)',
        handler: swrAxiosFetchDynamic,
      },
      {
        title: 'SWR client axios - server fetch(revalidate every 5s)',
        handler: swrAxiosFetchRevalidate,
      },
      {
        title: 'SWR client axios - server fetch',
        handler: swrAxiosFetch,
      },
      {
        title: 'SWR client axios - server axios',
        handler: swrAxiosAxios,
      },
      // server action
      { title: 'server action use fetch', handler: serverAction },
      { title: 'server action use axios', handler: axiosServerAction },
    ],
    [
      axiosAxios,
      axiosFetch,
      axiosFetchDynamic,
      axiosFetchRevalidate,
      axiosServerAction,
      fetchAxios,
      fetchFetch,
      fetchFetchDynamic,
      fetchFetchRevalidate,
      serverAction,
      swrAxiosAxios,
      swrAxiosFetch,
      swrAxiosFetchDynamic,
      swrAxiosFetchRevalidate,
      swrFetchAxios,
      swrFetchFetch,
      swrFetchFetchDynamic,
      swrFetchFetchRevalidate,
    ]
  )

  return testCases
}

interface TestZoomProps extends HTMLAttributes<HTMLElement> {
  title: string
  caller: () => Promise<any>
  result: string
}
function TestZoom({
  className,
  children,
  title,
  caller,
  result,
}: TestZoomProps) {
  return (
    <div className='border border-white flex flex-col'>
      <p className='px-4 grow'>{title}</p>
      <button className='rounded bg-teal-800' onClick={caller}>
        call api
      </button>
      <span className='h-6 px-4 font-bold'>{result}</span>
    </div>
  )
}

interface ClientProps extends HTMLAttributes<HTMLElement> {}
export default function Client({ className, children }: ClientProps) {
  const testCases = useTestCases()

  const getData = useCallback(async () => {
    await Promise.all(testCases.map(({ handler: { caller } }) => caller()))
  }, [testCases])

  return (
    <section>
      <button className='rounded bg-green-800 px-4 py-2 mb-4' onClick={getData}>
        Call every api
      </button>
      <div className='grid grid-cols-4 gap-4'>
        {testCases.map(({ title, handler: { caller, result } }, index) => (
          <TestZoom key={index} title={title} caller={caller} result={result} />
        ))}
      </div>
    </section>
  )
}
