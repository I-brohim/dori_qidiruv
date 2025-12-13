# 💊 Dorilar Qidiruvi (Medicine Search)

A modern web application for searching and browsing medicines registered in Uzbekistan. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Fast Search**: Real-time fuzzy search across 30,000+ medicines using Fuse.js
- **Smart Transliteration**: Automatically converts Latin input to Cyrillic for seamless searching
- **Prescription Filtering**: Filter medicines by prescription requirements
  - Retseptsiz (No prescription required)
  - Retsept bilan (Prescription required)
  - Hammasi (All medicines)
- **Detailed Information**: View medicine details including:
  - Brand name and active ingredients
  - Manufacturer information
  - Dosage form
  - Pharmacotherapy group
  - Dispensing conditions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Data Sources**: Transparent display of official data sources

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dorixona-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
dorixona-app/
├── app/
│   ├── page.tsx           # Main search page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── sources/
│       └── page.tsx       # Data sources page
├── public/
│   ├── medicines.json     # Prescription medicines data
│   └── medicines-no-prescription.json  # Non-prescription medicines data
├── scripts/
│   ├── convert-csv.js     # CSV to JSON converter
│   └── convert-no-prescription.js
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Search**: Fuse.js for fuzzy searching
- **UI**: Custom responsive components
- **Fonts**: Geist Sans and Geist Mono

## 📊 Data Sources

The application uses official data from:
- Cheklangan narxdagi dorilar ro'yxati (Price-controlled medicines list)
- Рецептсиз бериладиган дорилар рўйхати (Non-prescription medicines list)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The app can be deployed on:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Any Node.js hosting service

Build the production bundle:
```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📝 License

This project is private and created for educational purposes.

## 👨‍💻 Author

**Ibrohim Iskandarov**

---

Made with ❤️ for better healthcare access in Uzbekistan
