## Data Files Overview

This directory contains JSON files representing the spatial and organizational layout of various departments and areas within the organization. Each file corresponds to a specific department or area and encodes the arrangement of rooms, offices, and shared spaces for use in mapping or visualization applications.

### File Descriptions

- **accounting_finance_cells.json**
  - Contains the layout and room assignments for the Accounting & Finance department.
  - Each entry describes a room or merged cell, including its grid position (`rowStart`, `colStart`, etc.), occupant(s), phone extension, key locker number, and any relevant comments (e.g., staff on leave, visitor allocations).
  - Used to render the department’s map and provide details for facilities management.

- **deanery_lvl_2_cells.json**
  - Represents the Deanery Level 2 area.
  - Similar structure: each object details a room or space, its occupant(s), and additional notes.
  - Includes shared spaces like seating areas and kitchens.

- **economics_cells.json**
  - Encodes the Economics department’s spatial data.
  - Each cell includes room numbers, staff names, contact info, and key locker assignments.
  - Used for mapping and staff/room lookup.

- **gf_csi_cells.json**
  - Contains the layout for the Ground Floor CSI (possibly a research or admin area).
  - Entries include room assignments, key lockers, and special notes for hotdesks or shared spaces.

- **gf_da_cells.json**
  - Represents the Ground Floor DA area.
  - Similar structure, with merged cells for rooms, staff, and shared facilities.

- **marketing_cells.json**
  - Contains the Marketing department’s room and staff assignments.
  - Each entry details the room, occupant(s), phone extension, and key locker.
  - Comments may include notes about staff moves or temporary allocations.

- **mgmt_&_orgs_cells.json**
  - Encodes the Management & Organizations department’s spatial data.
  - Each object represents a room or merged cell, with occupant details and any special notes (e.g., visitor allocations, printer locations).

### Data Structure

Each JSON file is an array of objects, where each object typically contains:
- `type`: `"merged"` or `"single"` (indicates if the cell spans multiple grid positions)
- `rowStart`, `colStart`, `rowEnd`, `colEnd`: Grid coordinates for the cell’s position and span
- `content`: Text content for the cell (room number, occupant, phone, key locker, etc.)
- `bgColor`: Background color for visualization
- `comment`: Additional notes (may be `null`)
- `border`: Object specifying border styles for each side
- `room`: Room identifier (may match or summarize the content)

### Usage

These files are used by the frontend (in `src/components/ContentMap.tsx` ) to render interactive maps of each department or area. They support:
- Visualizing room assignments and staff locations
- Displaying contact and key locker information
- Managing space allocations and tracking changes (e.g., staff moves, visitor allocations)

### Maintenance Notes

- When updating room assignments, ensure consistency in `rowStart`, `colStart`, `rowEnd`, `colEnd` to avoid overlapping cells.
- Use the `comment` field for temporary allocations, staff on leave, or special instructions.
- Keep key locker numbers and phone extensions up to date for facilities and security purposes.


        