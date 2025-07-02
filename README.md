# Structurize AI

Structurize AI is a Next.js-based project designed to help users organize, analyze, and interact with structured data using modern web technologies and AI-driven features.

## Features
- Built with [Next.js](https://nextjs.org/)
- Modular component structure (UI components in `src/components/ui`)
- API routes for backend logic (`src/app/api`)
- Utility functions in `src/lib/utils.ts`
- Modern styling with TailwindCSS

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Environment variables

The project uses Google Gemini API.

```bash
GEMINI_API_KEY = API key from google gemini
```

### Running the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure
```
structurize-ai/
├── public/               # Static assets (SVGs, icons)
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── components/   # App-level components
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   └── lib/              # Utility functions
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts
- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
