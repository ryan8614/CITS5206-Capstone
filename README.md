# CITS5206 Capstone - Office Contacts: Sync Excels

Information Technology Capstone Project -- SEM 1 2025 Group 9

## Group Members

| No.       | Student Name         | Student Number     |
|:-------------|:--------------:|---------------:|
| 1      | Ryan Chang    | 23691038   |
| 2      | Jasmine Zhang     | 23941952 |
| 3    | Yifei Tang  |  23254894    |
| 4        | Chuan Wang     | 24035732|
| 5    | Yumin Zeng  | 24073955    |


## Table of Contents

- [CITS5206 Capstone - Office Contacts: Sync Excels](#cits5206-capstone---office-contacts-sync-excels)
  - [Group Members](#group-members)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [System Architecture](#system-architecture)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
    - [Database](#database)
  - [Installation Guide](#installation-guide)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Set Up the Database](#3-set-up-the-database)
    - [4. Start Development Server](#4-start-development-server)
    - [5. Build for Production](#5-build-for-production)
    - [6.Terminate the Server](#6terminate-the-server)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [Troubleshooting](#troubleshooting)
    - [Installation Issues](#installation-issues)
      - [Node.js Version Compatibility](#nodejs-version-compatibility)
      - [Dependency Installation Failures](#dependency-installation-failures)
      - [Database Connection Problems](#database-connection-problems)
      - [Build Errors](#build-errors)
    - [Authentication Problems](#authentication-problems)
      - [Login Failures](#login-failures)
      - [Session Expiration Issues](#session-expiration-issues)
      - [Registration Problems](#registration-problems)
  - [Testing](#testing)
    - [Prerequisites](#prerequisites)
    - [Running Tests](#running-tests)
    - [Test Categories](#test-categories)
    - [Writing New Tests](#writing-new-tests)
    - [Test Environment](#test-environment)
  - [Learn More](#learn-more)
  - [License](#license)



## Overview

This project is a web application developed for the Business School Operations Team to streamline the synchronization of Excel files via a centralized web interface. Currently, updates are performed manually across two separate documents, a process that is both time-consuming and prone to human error. Mistakes during cross-referencing often lead to outdated or missing contact information.

To enhance accuracy and operational efficiency, this application integrates Business School accommodation maps with contact lists, ensuring that all contact information is consistently up to date and ready for printing. By automating the synchronization process, the application reduces administrative workload, eliminates manual syncing, and maintains a reliable, real-time contact directory.

The application is built using Next.js. Client-provided Excel files are converted to JSON format and rendered as interactive accommodation maps and contact list web pages using Handsontable. Student lists are extracted from the original files to monitor PhD student completion status. Users can edit file contents directly on the web interface, and updates are automatically synchronized across all back-end files. The application also offers a download feature for the modified files and sends email notifications regarding PhD student completion, enabling the operations team to efficiently reassign rooms.

## System Architecture

The system is built using a modern full-stack architecture that emphasizes scalability, responsiveness, and ease of maintenance. Below is a breakdown of the main components:

### Client Side
**Framework**: Next.js – A React-based framework for building server-rendered and statically generated web applications.

**Styling**: Tailwind CSS – A utility-first CSS framework for creating highly customizable user interfaces with minimal effort.

**Language**: TypeScript – Enhances JavaScript with type safety, improving code quality and reducing runtime errors.

**UI Component**: Handsontable – An Excel-like data grid component that allows users to view and edit tabular data interactively within the browser.

### Server Side
**Hosting Platform**: Vercel Serverless Functions – Handles backend logic using lightweight serverless architecture with built-in scalability.

**Backend Framework**: Node.js with Express – Used within Vercel serverless functions for API routing and backend processing.

**Email Notifications**: PythonAnywhere – A Python-based platform used to send automated email notifications, specifically for tracking PhD student completions and alerting the operations team.

### Database
**ORM**: Prisma – A modern database toolkit that simplifies database access with type-safe queries and schema management, integrated into the backend for managing contact and accommodation data.

This architecture ensures fast front-end rendering, real-time data synchronization, and reliable serverless performance while maintaining a clear separation of concerns and modularity.

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
### 3. Set Up the Database 
a. Create a .env file in the project root with the following content:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials.

> **Note:** The project is configured to use PostgreSQL by default. If you wish to use SQLite for local development, you must update the `provider` in `prisma/schema.prisma` to `"sqlite"` and set `DATABASE_URL="file:./prisma/dev.db"` in your `.env` file.

In `.env`
```
DATABASE_URL="file:./prisma/dev.db"
```

In `prisma/schema.prisma`
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

b. Run Prisma Migrations to set up the database schema:
```
npx prisma migrate dev --name init
```
This will create the necessary tables and columns as defined in prisma/schema.prisma .

 c. (Optional) Generate Prisma Client:
```
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

Or using yarn:

```bash
yarn build
yarn start
```
### 6.Terminate the Server
Press Ctrl + C in the terminal to stop the process.

## Project Structure

```bash
📁 Auto_notify                # Python scripts for automated email notifications
├── auto_notify.md            # Documentation for the auto notification process
├── check_notify.py           # Script to check notification conditions
├── config.py                 # Configuration for notification settings
├── students_data.json        # Student data for notification logic
├── test.json                 # Sample test data
└── __pycache__/              # Python bytecode cache

📁 prisma                     # Prisma ORM configuration and migrations
├── dev.db                    # SQLite database file (local development)
├── migrations/               # Database migration history
│   ├── ...                   # Individual migration folders
│   └── migration_lock.toml   # Migration lock file
├── prisma/                   # (May contain generated Prisma client code)
├── schema.prisma             # Prisma schema definition

📁 public                     # Static assets and public data
├── favicon.ico               # Website favicon
├── file.svg                  # SVG assets
├── globe.svg
├── next.svg
├── vercel.svg
├── window.svg
├── data/                     # Data used by the frontend
│   ├── contact_list/         # Contact list JSONs
│   └── maps/                 # Accommodation map data
├── documentation/            # Project documentation files
│   ├── DesignChanges.md
│   ├── DeveloperHandover.md
│   ├── UserManual.md
│   ├── api.md
│   ├── auth.md
│   ├── components.md
│   ├── data.md
│   ├── excel-edit.md
│   ├── features.md
│   ├── lib.md
│   ├── prisma.md
│   ├── student_json.md
│   ├── tests.md
│   ├── ui.md
│   └── upload.md

📁 src                        # Main application source code
├── app/                      # Next.js app directory
│   ├── actions/              # Server actions (API logic)
│   ├── api/                  # API route handlers
│   ├── auth/                 # Authentication logic
│   ├── features/             # Feature-specific modules
│   ├── globals.css           # Global CSS
│   ├── layout.tsx            # App layout component
│   ├── not-found.tsx         # 404 page
│   ├── page.tsx              # Main entry page
│   ├── signin/               # Sign-in page/components
│   ├── signup/               # Sign-up page/components
│   └── ui/                   # Shared UI components
├── components/               # Reusable React components
│   ├── ContentMap.tsx
│   ├── UploadDragger.tsx
│   ├── header.tsx
│   └── usePreventScrollBleed.ts
├── lib/                      # Utility libraries and helpers
│   ├── definitions.ts
│   ├── loadFilteredContacts.ts
│   ├── loadFilteredStudents.ts
│   ├── parseExcelAndSave.ts
│   └── session.tsx
└── middleware.ts             # Next.js middleware

📁 student_json                # Scripts and data for student JSON processing
├── data_transfer.py           # Script for data transfer
└── raw_data.xlsx              # Raw Excel data

📁 tests                       # Automated test suites (Jest)
├── auth.test.tsx              # Authentication tests
├── middleware.test.tsx        # Middleware tests
├── session.test.tsx           # Session management tests
├── session_route.test.tsx     # Session API route tests
└── upload_route.test.tsx      # Upload API route tests

README.md                      # Project documentation (this file)
```
## Usage

**Open the website**: 
1. Open the website: https://cits-5206-capstone.vercel.app
2. Or run the application using the commands provided above to open the website.

**Sign Up**: 
1. Navigate to the Sign Up page by clicking the "Sign up" button on the homepage.
2. Enter your username, email address, and create a secure password.
3. Click the "Register" button to create your account.
4. Upon successful registration, you'll be automatically redirected to the Sign In page.

**Login**: 
1. Navigate to the Login page by clicking the "Sign in" button on the homepage.
2. Enter your username and password.
3. Click the "Sign in" button to access your account.
4. Once logged in, you'll have access to the Excel synchronization features.

**Edit**: 
1. After logging in, click on the "Edit" option in the navigation menu.
2. From the sidebar menu, select the Excel file you wish to edit.
3. Use the spreadsheet interface to make changes to your data:
   - Add or delete rows using the context menu (right-click)
   - Edit cell values directly by clicking on them
   - Use dropdown menus to choose the source type “Academic” or “Research”

**Save Changes**: 
1. After making edits to your spreadsheet, click the "Save Changes" button located at the top of the editing interface.
2. The system will automatically synchronize your changes across all related files.
3. A success notification will appear when your changes have been saved successfully.

**Download**:
1. To download your synchronized Excel files, click on the "Download" option in the navigation menu.
2. Select the file you wish to download from the available options.
3. The file will be downloaded to your device with all the latest changes applied.


## Troubleshooting

### Installation Issues
#### Node.js Version Compatibility

**Problem**: Application fails to start with errors related to syntax or unsupported features.

**Solution**:
- Ensure you're using Node.js version 18.x or higher
- Run `node -v` to check your current version
- If needed, install the correct version using a version manager like nvm:
  ```bash
  nvm install 18
  nvm use 18
  ```

#### Dependency Installation Failures

**Problem**: `npm install` fails with package conflicts or errors.

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete node_modules folder and package-lock.json: `rm -rf node_modules package-lock.json`
- Reinstall dependencies: `npm install`
- If specific packages fail, try installing them individually with exact versions from package.json

#### Database Connection Problems

**Problem**: Errors such as `Environment variable not found: DATABASE_URL` or `PrismaClientInitializationError`.

**Solution**:
- Ensure you have created a `.env` file in the project root with a valid `DATABASE_URL` for PostgreSQL.
- If using a local PostgreSQL instance, verify that the database server is running and accessible.
- Double-check your credentials and connection string format.
- If you wish to use SQLite for local development, update both your `.env` and `prisma/schema.prisma` as described above.
- After any changes to the database or schema, re-run `npx prisma migrate dev` and `npx prisma generate`.

**Problem**: `prisma.user.findUnique()` or other Prisma queries fail.

**Solution**:
- This is usually due to an incorrect or missing `DATABASE_URL`, or the database schema not being migrated. Follow the steps above to resolve.
- 
#### Build Errors

**Problem**: `npm run build` fails with TypeScript or compilation errors.

**Solution**:
- Check for TypeScript errors: `npx tsc --noEmit`
- Ensure all required environment variables are set (see below)
- Try clearing Next.js cache: `rm -rf .next`

### Authentication Problems

#### Login Failures

**Problem**: Unable to log in despite correct credentials.

**Solution**:
- Ensure the database is properly initialized with user accounts
- Check if SESSION_SECRET environment variable is set
- Clear browser cookies and try again
- If using a new account, verify it was created successfully in the database

#### Session Expiration Issues

**Problem**: Frequently being logged out or redirected to login page.

**Solution**:
- Sessions are set to expire after 3 hours by default
- Check for proper cookie storage in your browser
- Ensure your system clock is correctly synchronized
- Verify the SESSION_SECRET environment variable hasn't changed

#### Registration Problems

**Problem**: Unable to create a new account.

**Solution**:
- Ensure email and username are unique (not already in the database)
- Check for proper database connection
- Verify password meets minimum requirements
- Check server logs for specific error messages


## Testing
This project uses Jest for testing. The tests cover various aspects of the application including authentication, middleware, session management, and API routes.

### Prerequisites

Before running the tests, make sure you have installed all the dependencies:

```bash
npm install
```

### Running Tests

To run all tests, use the following command:

```bash
npx jest
```

To run a specific test file, use:

```bash
npx jest tests/auth.test.tsx
```

### Test Categories

The test suite includes the following categories:

1. **Authentication Tests** (`auth.test.tsx`)
   - Tests for user signup, signin, and logout functionality
   - Validates user creation, credential verification, and session management

2. **Middleware Tests** (`middleware.test.tsx`)
   - Tests for route protection and authentication checks
   - Validates redirects for authenticated and unauthenticated users

3. **Session Management Tests** (`session.test.tsx`)
   - Tests for session creation, updating, and deletion
   - Validates JWT encryption/decryption and cookie management

4. **API Route Tests**
   - Session API tests (`session_route.test.tsx`): Validates session status endpoints
   - Upload API tests (`upload_route.test.tsx`): Tests Excel file upload functionality

### Writing New Tests

When adding new features, please include appropriate tests. Follow these guidelines:

1. Create test files in the `tests` directory
2. Use descriptive test names that explain what is being tested
3. Mock external dependencies using Jest's mocking capabilities
4. Follow the existing test patterns for consistency

### Test Environment

Tests run in a Node.js environment with Jest. The test environment uses:

- In-memory mocks for database operations
- Mocked authentication and session management
- Isolated API route testing

## Future Enhancements

- **Input Validation**  
  Introduce constraints on input fields to prevent the submission of invalid or inconsistent data during editing.

- **Search Functionality**  
  Implement a robust search feature to quickly locate room or staff information.

- **Integrated Navigation**  
  Enable clickable links between the accommodation map and the contact list, allowing users to easily navigate between related information in both views.

- **Printable Contact List**  
  Refine the formatting of the contact list to enhance readability and ensure it is print-ready.

- **Role-Based Access Control (RBAC)**  
  Implement a permission management system to assign different levels of access based on user roles (e.g., admin, staff, viewer), ensuring data security and appropriate usage.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [the Next.js GitHub repository](https://github.com/vercel/next.js) - Next.js GitHub Repository.

Deploy on Vercel:

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) - a new font family for Vercel to automatically optimize and load [Geist](https://vercel.com/font).

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under a **Proprietary License**.

This repository contains confidential data and proprietary code developed for internal use within the University of Western Australia.  
🚫 **Do not copy, distribute, or disclose any part of this repository without prior written consent.**

All names, office locations, and contact details are considered sensitive information and must be handled in accordance with applicable privacy and data protection laws.



