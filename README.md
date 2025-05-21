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
    - [3. Start Development Server](#3-start-development-server)
    - [4. Build for Production](#4-build-for-production)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [Troubleshooting](#troubleshooting)
    - [Installation Issues](#installation-issues)
      - [Node.js Version Compatibility](#nodejs-version-compatibility)
      - [Dependency Installation Failures](#dependency-installation-failures)
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

## Project Structure

```bash
📁 Auto_notify
├── Notebook.md                # Notes related to the auto notification process
├── check_notify.py           # Script for checking notification conditions
├── config.py                 # Configuration file for notification settings
├── students_data.json        # Student data used in notification logic
├── test.json                 # Sample test data for development

📁 prisma
├── dev.db                    # SQLite database file
└── migrations/
    └── 20250422050751_init/
        └── migration.sql     # Initial database schema

📁 public
├── data/
    ├── contact_list/
    │   └── contact_list.json # JSON contact list used in frontend rendering
    └── maps/
        ├── cells/
        │   ├── accounting_finance_cells.json
        │   ├── deanery_lvl_2_cells.json
        │   ├── economics_cells.json
        │   ├── gf_csi_cells.json
        │   ├── gf_da_cells.json
        │   ├── marketing_cells.json
        │   └── mgmt_&_orgs_cells.json
        │       # Define grid cell data for layout visualization
        ├── layouts/
        │   ├── accounting_finance_layout.json
        │   ├── deanery_lvl_2_layout.json
        │   ├── economics_layout.json
        │   ├── gf_csi_layout.json
        │   ├── gf_da_layout.json
        │   ├── marketing_layout.json
        │   └── mgmt_&_orgs_layout.json
        │       # Define the layout metadata for room arrangements
        └── students.json     # PhD student completion and allocation data

📁 src
├── components/
│   ├── ContentMap.tsx            # Renders the accommodation layout
│   ├── UploadDragger.tsx         # Upload interface for Excel/JSON files
│   ├── header.tsx                # Page header UI
│   └── usePreventScrollBleed.ts # Custom hook for UX improvement
├── lib/
│   ├── definitions.ts            # Shared types and constants
│   ├── parseExcelAndSave.ts     # Parses uploaded Excel files to JSON
│   └── session.tsx              # Handles session-related functionality
└── middleware.ts                # Middleware for API/session handling

📁 student_json
├── data_transfer.py           # Script for converting raw Excel to JSON
└── raw_data.xlsx              # Original spreadsheet for room or student data

📁 tests
├── auth.test.tsx             # Test for authentication features
├── middleware.test.tsx       # Test for backend middleware
├── session.test.tsx          # Unit tests for session logic
├── session_route.test.tsx    # API route tests for session
└── upload_route.test.tsx     # Tests for upload API endpoints

📄 README.md                   # Project overview and usage instructions

📄 DesignChanges.md                   # Project design changes during the implemente process
```


## Usage

**Open the website**: 
1. Use the deployed link to open the website
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

