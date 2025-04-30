# CITS5206-Capstone

Information Technology Capstone Project -- SEM 1 2025

# Overview

This project is a web application that allows users to synchronize their Excel files on a web page. The application is built with Next.js. Users can select an Excel file and upload it, and the application will read the data from the Excel file and present it on the front-end page. Users can edit the file content on the front-end page, and the changed content will be synchronized to all files on the back-end. The application provides a download link for the modified file.

### Technical architecture

📌 User operation process  
1️⃣ User uploads fileA.xlsx and fileB.xlsx.  
2️⃣ User modify the fileA.xlsx on the web page.  
3️⃣ System records the change and updates fileB. xlsx.  
4️⃣ User downloads updated fileB.xlsx.  

📌 System architecture
Frontend: Next.js (user uploads Excel)
Backend: Vercel Serverless (Node.js + Express)
Database: Prisma

This is a [Next.js](https://nextjs.org) project Tailwinded with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
