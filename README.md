# Next.js Cache Mechanism Testing

This project is designed to test various caching mechanisms in Next.js, utilizing both `fetch` and `axios` for API requests. The primary focus is to observe and understand how different caching strategies affect data fetching in a Next.js application.

![image](https://github.com/user-attachments/assets/b1a0e93c-f6d3-4181-9d76-1624fae74eed)

![Peek 2024-07-18 18-20](https://github.com/user-attachments/assets/8cdf8bbb-554e-4143-8630-0abb290e0128)


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
