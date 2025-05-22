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
/public                # Static assets including Handover Documentations
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

## Design Changes

During the initial planning phase, our approach was to build the accommodation map using Bootstrap and allow users to upload Excel files to update the map dynamically. However, as development progressed, we identified several limitations with this approach, particularly in terms of interactivity, flexibility, and maintaining responsiveness across different screen sizes.

To address these challenges, we revised the workflow and adopted a new strategy using JSON data structures and Handsontable, a JavaScript-based spreadsheet component. This updated solution enables a more dynamic, interactive, and maintainable system for managing both the accommodation layout and the associated contact lists.

This change significantly improves the system's scalability and user experience, particularly when handling frequent updates or custom data views.

For further technical details and rationale behind this design decision, please refer to public/documentation/DesignChanges.md in this repository.

## Detailed Handover Documents

Detailed handover documents of key features, components, APIs, scripts etc. are listed in public/documentation folder as below:

```
public/documentation/DeveloperHandover.md
public/documentation/UserManual.md
public/documentation/DesignChanges.md
public/documentation/prisma.md
public/documentation/data.md
public/documentation/auth.md
public/documentation/api.md
public/documentation/excel-edit.md
public/documentation/upload.md
public/documentation/features.md
public/documentation/ui.md
public/documentation/components.md
public/documentation/lib.md
public/documentation/student_json.md
public/documentation/tests.md
```

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

## Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
