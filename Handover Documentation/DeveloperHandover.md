# Developer Documentation Overview

## Project Overview
This project is a web application developed for the Business School Operations Team to streamline the synchronization of Excel files via a centralized web interface. Currently, updates are performed manually across two separate documents, a process that is both time-consuming and prone to human error. Mistakes during cross-referencing often lead to outdated or missing contact information.

To enhance accuracy and operational efficiency, this application integrates Business School accommodation maps with contact lists, ensuring that all contact information is consistently up to date and ready for printing. By automating the synchronization process, the application reduces administrative workload, eliminates manual syncing, and maintains a reliable, real-time contact directory.

The application is built using Next.js. Client-provided Excel files are converted to JSON format and rendered as interactive accommodation maps and contact list web pages using Handsontable. Student lists are extracted from the original files to monitor PhD student completion status. Users can edit file contents directly on the web interface, and updates are automatically synchronized across all back-end files. The application also offers a download feature for the modified files and sends email notifications regarding PhD student completion, enabling the operations team to efficiently reassign rooms.

## Installation Guide 

This is a Next.js project with TypeScript, Tailwind CSS, and Ant Design. Here are the steps you need to take before running the code:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CITS5206-Capstone.git
cd CITS5206-Capstone
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Start Development Server

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

Or using yarn:

```bash
yarn build
yarn start
```

## Directory Structure
```
/Auto_notify           # Email Notification scripts and data
/Dev-frontend-contact_list  # Contact list frontend
/Dev-frontend-floor-plans   # Floor plans frontend(design changed, not in use anymore)
/prisma                # Prisma schema and migrations
/public                # Static assets
/src                   # Main application source
  /app                 # Next.js app directory
    /api               # API route handlers
    /auth              # Authentication pages
    /features          # Feature modules
    /ui                # UI components
  /components          # Shared React components
  /lib                 # Utility libraries (session, Excel parsing)
/student_json                 # Student raw data and processed script
/tests                 # Jest test files
```

Detailed handover documents of key features, components, APIs, scripts etc. are listed within each folder.

## Development & Maintenance
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Contribution Guidelines
- Follow code style and naming conventions.
- Write unit/integration tests for new features.
- Document new APIs and modules in this file.

## Troubleshooting
- Check logs for errors.
- Ensure database migrations are up to date.
- For file upload issues, verify MIME types and file size limits.

## Further Reading
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)