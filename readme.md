# Github Clone - Attractor Assignment

## Dependencies

- [typescript](https://www.typescriptlang.org/): it's the only options
- [next](https://nextjs.org/): route handling
- [next-auth](https://next-auth.js.org/): authentication
- [react-query](https://tanstack.com/query/v3/): data fetching
- [shadcn-ui](https://ui.shadcn.com/): ui library

## Getting Started

First:

```bash
git clone https://github.com/txedax/attractor-assignment
cd attractor-assignment
npm install
```

Set these environment variables:

```bash
NEXTAUTH_SECRET="your-super-secret-string"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
