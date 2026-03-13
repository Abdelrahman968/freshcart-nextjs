# FreshCart 🛒

FreshCart is a modern e-commerce web application built to provide a seamless shopping experience. It features an intuitive interface, fast navigation, and a robust set of features tailored for online retail.

## 🚀 Tech Stack

This project leverages modern frontend technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **UI Components**: [HeroUI](https://www.heroui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: [Exo Font](https://fonts.google.com/specimen/Exo) (via `next/font`)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Carousels**: [Swiper](https://swiperjs.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **UI Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`
- **Progress Bar**: `nprogress` for route transitions

## 📂 Project Structure

- `src/app`: Contains the Next.js App Router layout, pages, and global styles.
- `src/app/(Auth)`: Authentication routes.
- `src/app/products`: Products listings and details routes.
- `src/components`: Reusable UI components like `Navbar`, `ProgressBar`, and more.
- `src/services`: API handlers and external service integrations.
- `src/assets`: Static assets, images, and brand materials.
- `src/data`: Mock data or static constants.
- `src/types`: TypeScript definitions and interfaces.

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 👨‍💻 Author

- **Abdelrahman Ayman**

## 📄 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
