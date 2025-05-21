# Features Handover Document

## 1. Overview

This project uses React and Handsontable to provide editable, spreadsheet-like tables for managing staff, student, and contact data. The features are organized into two main categories:

- **Contacts Features**: Manage staff and contact lists for various departments.
- **Students Features**: Manage student lists for various departments.

Each feature page provides a table interface with the ability to edit, add, and remove rows, as well as save changes to the backend.

---

## 2. Contacts Features

Located in: `src/app/features/contacts/pages/`

### Common Functionality

- **Table Rendering**: Uses `HotTable` from `@handsontable/react` to display and edit data.
- **Data Source**: Data is fetched using `useFilteredContacts` hook, filtered by department.
- **Custom Row Rendering**: Uses `coloredRowRenderer` for custom cell/row styling.
- **Save Functionality**: Changes can be saved using the `saveTableData` function.
- **Scroll Handling**: Uses `usePreventScrollBleed` to prevent scroll bleed issues.
- **UI**: Includes a "Save Changes" button and department-specific headings.

### Department Pages

- **AccFin.tsx**: Accounting & Finance staff contact list.
- **Dean's_Office.tsx**: Dean's Office staff contact list.
- **Marketing.tsx**: Marketing staff contact list.
- **MO.tsx**: Management & Organisations staff contact list.

#### Table Columns

- **Full Name**
- **Position**
- **Ext No**
- **Room**
- **Source**: Dropdown with options (e.g., 'Academic', 'Research').

---

## 3. Students Features

Located in: `src/app/features/students/pages/`

### Common Functionality

- **Table Rendering**: Uses `HotTable` for editable student lists.
- **Data Source**: Data is fetched using `useFilteredStudents` hook, filtered by department.
- **Save Functionality**: Changes can be saved using the `saveStudentsData` function.
- **Scroll Handling**: Uses `usePreventScrollBleed`.
- **UI**: Includes a "Save Changes" button and department-specific headings.

### Department Pages

- **AccFin_S.tsx**: Accounting & Finance student list.
- **GF_DA_S.tsx**: Ground Floor - DA Staff student list.
- **Marketing_S.tsx**: Marketing student list.
- **MO_S.tsx**: Management & Organisations student list.

#### Table Columns

- **Name**
- **End Date**
- **Comment**
- **Pod No**
- **Type**: Dropdown with options (e.g., 'HDR', 'New PhD in 2025', 'PhDs', 'Mphil', 'Visiting Student', 'Other').

---

## 4. Shared Features

- **Editable Tables**: All tables allow inline editing, row addition, and deletion via context menu.
- **Column Customization**: Each table defines its own columns and dropdown options.
- **Manual Column Resize**: Users can resize columns.
- **Auto Wrapping**: Rows and columns auto-wrap for better readability.
- **Consistent UI**: All pages use Ant Design's `Button` for actions and Tailwind CSS for layout.

---

## 5. How to Extend

- To add a new department, create a new page in the appropriate directory and configure the data source and columns as needed.
- To change dropdown options or columns, edit the `columns` prop in the relevant page.
- To customize saving logic, modify `saveTableData` or `saveStudentsData` in their respective components directories.

---

## 6. Dependencies

- **React**
- **Handsontable** (`@handsontable/react`)
- **Ant Design** (`antd`)
- **Custom Hooks**: `useFilteredContacts`, `useFilteredStudents`, `usePreventScrollBleed`
- **Custom Renderers**: `coloredRowRenderer` (for contacts)



        