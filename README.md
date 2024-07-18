# Next.js Cache Mechanism Testing

This project is designed to test various caching mechanisms in Next.js, utilizing both `fetch` and `axios` for API requests. The primary focus is to observe and understand how different caching strategies affect data fetching in a Next.js application.

![image](https://github.com/user-attachments/assets/a390a602-a961-4fcc-ad2e-7da4af72a77f)

![Peek 2024-07-18 20-02](https://github.com/user-attachments/assets/931cec8b-b90b-4a75-afc7-74bd0c00f375)

## Setup

Run any mock API server you prefer, for example: [mockoon](https://mockoon.com/).  
Configure your API endpoint in the .env file under TEST_API.

Example .env file:

```script
TEST_API=http://127.0.0.1:4000/foobar
```

After the mock API is running, you can run:

```script
npm run build
npm run start
```

to test the behavior.

## Project Structure

The core functionality is implemented in the following locations:

- `app/action`: Tests api calls use `server action`.
- `app/api/*`: Tests api calls use `fetch` or `axios`.
- `lib`: Reads the api URI from `.env`.

## Nextjs Doc Ref
https://nextjs.org/docs/app/building-your-application/caching  
https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them#static-or-dynamic-route-handlers  
https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching
