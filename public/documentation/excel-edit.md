# Excel Edit Feature Handover Document

## Directory Location

- **Path:** `src/app/auth/excel-edit`

## Purpose

The `excel-edit` feature provides a web-based interface for editing map and room data in a spreadsheet-like (Excel-style) format. It is intended for administrators or authorized users to view, modify, and save the layout and assignment of rooms, staff, and students within the system.

## Directory Structure

```
src/app/auth/excel-edit/
├── layout.tsx
└── page.tsx
```

### 1. `layout.tsx`

- **Purpose:**  
  Defines the layout and shared UI for the Excel Edit pages. This may include navigation, headers, or context providers required by the editing interface.
- **Typical Contents:**  
  - React component that wraps the main content of the Excel editor.
  - May provide context or styling for the editor page.
- **Usage:**  
  Imported by `page.tsx` to ensure consistent layout and shared functionality across the Excel editing interface.

### 2. `page.tsx`

- **Purpose:**  
  Implements the main Excel-style editing interface.
- **Typical Contents:**  
  - React component that renders the spreadsheet/grid for editing.
  - Handles data fetching (loading map/cell data), user interactions (cell editing, selection), and saving changes.
  - Integrates with API endpoints such as `/api/get-map-data` and `/api/save-map-data` to load and persist changes.
  - May include validation logic, undo/redo, and feedback to the user.
- **Usage:**  
  This is the main entry point for users accessing the Excel editing feature. It is rendered when users navigate to the corresponding route.

## Data Flow

- **Loading Data:**  
  The editor fetches map/cell data from the backend (see `/api/get-map-data`) and populates the spreadsheet interface.
- **Editing:**  
  Users can modify cell contents, add/remove rooms, or update assignments directly in the grid.
- **Saving:**  
  Changes are sent to the backend via `/api/save-map-data` (and possibly other endpoints) to update the JSON files in `public/data/maps/`.

## Related API Endpoints

- **`/api/get-map-data`**: Loads the current map/cell data for editing.
- **`/api/save-map-data`**: Saves the edited map/cell data back to the server.
- **`/api/save-contact-data`** and **`/api/save-student-data`**: May be used for updating staff/student assignments if integrated.

## Permissions & Security

- Access to the Excel Edit feature should be restricted to authorized users (e.g., admins).
- Ensure authentication and session checks are in place before allowing edits.

## Recommendations for Future Developers

- **UI Enhancements:** Consider adding features like bulk editing, import/export, or validation feedback.
- **Testing:** Ensure both UI and API endpoints are covered by tests.
- **Error Handling:** Provide clear feedback for failed saves or invalid data.
- **Documentation:** Keep this handover and code comments up to date as the feature evolves.

## Related Files

- **API Endpoints:**  
  - <mcfile name="route.ts" path="src/app/api/get-map-data/route.ts"></mcfile>
  - <mcfile name="route.ts" path="src/app/api/save-map-data/route.ts"></mcfile>
- **Data Files:**  
  - `public/data/maps/cells/*.json`
  - `public/data/maps/layouts/*.json`

