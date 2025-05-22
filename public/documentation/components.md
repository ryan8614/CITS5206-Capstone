# Components Handover Document

## Overview

The `src/components` directory contains reusable React components and utility hooks used throughout the application. These components are primarily focused on UI elements and shared logic, supporting features such as file uploads, navigation headers, and scroll behavior.

---

## 1. `UploadDragger.tsx`

**Purpose:**  
A drag-and-drop file upload component using Ant Design's `Upload` and `notification` APIs.

**Key Features:**
- Allows users to drag and drop files or click to select files for upload.
- Supports multiple file uploads.
- Only accepts Excel files (`.xls`, `.xlsx`).
- Displays notifications for successful uploads or errors.
- Uses `/api/upload` as the upload endpoint.
- Handles file drop events and logs dropped files to the console.

**Usage:**  
Import and use `<UploadDragger />` wherever file upload functionality is needed.

**Note:**
This components is no longer used in the app, but is kept here for reference. Details regarding cancel the upload feature are in the `DesignChanges.md` file under `main` branch.

---

## 2. `header.tsx`

**Purpose:**  
A navigation header component that displays links and manages user authentication state.

**Key Features:**
- Shows navigation links (Edit, Upload, Download).
- Displays a "Sign out" button if the user is logged in.
- Highlights the active navigation link based on the current route.
- Uses Next.js navigation hooks (`usePathname`, `useRouter`).
- Checks login status on mount by calling `/api/session`.
- Handles logout by calling the `logout` action and redirecting to the home page.

**Usage:**  
Used at the top of main pages to provide consistent navigation and authentication controls.

---

## 3. `ContentMap.tsx`

**Purpose:**  
(Not shown in code, but referenced in the app.)  
Presumably, this file exports a mapping of keys to content components, used for dynamic rendering in the Excel editing interface.

**Usage:**  
Imported as `content_map` in the Excel edit page to display different content based on menu selection.

---

## 4. `usePreventScrollBleed.ts`

**Purpose:**  
(Not shown in code, but referenced in student/contact table pages.)  
A custom React hook to prevent scroll bleed between nested scrollable containers, especially useful for tables with fixed headers or virtualized content.

**Usage:**  
Called in table components to ensure smooth and isolated scrolling behavior.

---

## General Notes

- All components are written in TypeScript and use React functional components.
- The codebase leverages Ant Design for UI elements and notifications.
- Components are designed to be reusable and composable across different pages.
- Utility hooks and mapping files (like `usePreventScrollBleed.ts` and `ContentMap.tsx`) are intended to encapsulate shared logic and configuration.

---

## Recommendations for Future Developers

- **Component Reuse:** When building new features, check if a suitable component already exists in this folder before creating a new one.
- **UI Consistency:** Use the provided components to maintain a consistent look and feel across the application.
- **Extending Functionality:** If you need to extend a component (e.g., add new upload validations), do so in a backward-compatible way to avoid breaking existing usage.
- **Documentation:** Continue to document new components and hooks with clear JSDoc comments for maintainability.


        