# 1. Accommodation (Floor Plan) Implementation Changes

## Initial Approach (Using Bootstrap + HTML)

Originally, the project planned to use **Bootstrap** and HTML to create a visual floor plan.

- Each room was identified using a **unique room number ID**.
- Clicking a room would retrieve and display its associated contact list information.
- Updates to the contact list would then propagate back to the floor plan using this unique room ID.

**Why It Changed:**
- This method became difficult to scale and was not sufficiently interactive for editing content.
- Handling layout and data updates through HTML shapes and DOM manipulation was error-prone.

## Updated Approach (Excel → JSON → Handsontable)

We pivoted to a more interactive and manageable approach using **Excel + JSON + Handsontable**.

### Step-by-Step Migration

1. **Cleaning the Original Floor Plan:**
   - Removed shapes, lines, and icons from the original HTML-based map.
   - Exported the cleaned Excel file (cell-based layout and content only).

2. **Conversion:**
   - Used online tools to convert the Excel file into JSON format.
   - This gave us two key datasets:
     - `layoutData`: grid/cell positions
     - `contentData`: room details and associated contact info

3. **Rebuilding with Handsontable:**
   - Used a custom script to map `layoutData` and `contentData` into a Handsontable instance.
   - Rooms are now visually represented as editable cells.
   - Each cell still references the same **unique room ID** for data mapping and updates.

## Benefits of the New Approach

- **Interactive editing** of room content directly in the browser
- Easier maintenance and scalability
- Better data synchronization between UI and backend


# 2. File Handling and Upload Feature Changes

## Initial Plan: Automated File Upload & Parsing

Our original plan was to:
- Allow clients to upload excel accommodation files.
- Use a script to **automatically parse and convert** these files into a usable format.
- Automatically update the accommodation webpages using the processed data.

### Problem Encountered:
- Client files came in **inconsistent formats** (structure, layout, content).
- Parsing such files reliably proved difficult.
- Incorrect conversions could lead to **data mismatch or system crashes** during runtime.

## Updated Plan: Manual Preprocessing + Static Layout

Given the difficulty of fully automating this pipeline and the **relatively static nature of floor plans**, we updated our approach:

### Step-by-Step Solution:

1. **Manual Cleanup of Client Files**
   - Cleaned raw Excel/PDF maps to remove unnecessary shapes, styles, and inconsistent formats.
   - Ensured consistent cell structure to avoid script errors.

2. **Conversion to JSON**
   - Used online tools or internal scripts to convert cleaned floor maps to JSON format.
   - Extracted:
     - Cell layout data (for visual structure)
     - Room metadata and content

3. **Static Layout Assumption**
   - The Business School's room layout is **unlikely to change** in the near future.
   - Therefore, we only need to capture and use the **layout once**.
   - Future changes will likely involve **contact list updates**, not structural changes.

4. **Content Syncing**
   - Contact list updates can be done directly via the web interface (Handsontable).
   - These updates sync with the floor plan by matching the unique room ID.

## Benefits of This Approach

- **More reliable** processing with clean, consistent input.
- **Avoids crashes** from faulty or inconsistent data.
- **Reduced development complexity** — no need for complex file parsing logic.
- **Efficient maintenance** — only contact list needs to be updated.
