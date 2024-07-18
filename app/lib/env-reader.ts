const checkEnv = (envKey: string) => {
  const envValue = process.env[envKey]
  if (!envValue) throw new Error(`Missing env variable: ${envKey}`)
  return envValue
}

export const TEST_API = checkEnv('TEST_API')
