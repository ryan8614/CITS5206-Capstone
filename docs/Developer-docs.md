# Developer Documentation

## Project Overview
This project is a web application built with Next.js, TypeScript, and Prisma ORM. It features RESTful API endpoints, file upload and parsing, session management, and a modular frontend structure. The backend interacts with a SQLite database via Prisma.

## Architecture
- **Frontend:** Next.js (React-based), TypeScript, Tailwind CSS for styling.
- **Backend:** Next.js API routes, Prisma ORM for database access.
- **Database:** SQLite (development), managed via Prisma migrations.
- **Testing:** Jest for unit and integration tests.

## Directory Structure
```
/Auto_notify           # Notification scripts and data
/Dev-frontend-contact_list  # Contact list frontend
/Dev-frontend-floor-plans   # Floor plans frontend
/docs                  # Documentation
/prisma                # Prisma schema and migrations
/public                # Static assets
/scripts               # Utility scripts
/src                   # Main application source
  /app                 # Next.js app directory
    /api               # API route handlers
    /auth              # Authentication pages
    /features          # Feature modules
    /ui                # UI components
  /components          # Shared React components
  /lib                 # Utility libraries (session, Excel parsing)
/tests                 # Jest test files
```

## Key Modules & Files
- **API Endpoints:**
  - `/src/app/api/session/route.ts`: Session status endpoint (`GET`)
  - `/src/app/api/upload/route.ts`: Excel file upload endpoint (`POST`)
- **Session Management:**
  - `/src/lib/session.tsx`: Contains `checkSession()` for verifying user sessions.
- **Excel Parsing:**
  - `/src/lib/parseExcelAndSave.ts`: Parses uploaded Excel files and saves as JSON.
- **Database Schema:**
  - `/prisma/schema.prisma`: Defines database models and relations.

## API Documentation
### Session API
- **Endpoint:** `/api/session`
- **Method:** `GET`
- **Description:** Returns `{ isLoggedIn: boolean }` indicating user session status.
- **Example:**
  ```js
  fetch('/api/session').then(res => res.json())
  // { isLoggedIn: true }
  ```

### Upload API
- **Endpoint:** `/api/upload`
- **Method:** `POST`
- **Description:** Accepts an Excel file, parses it, and stores the result as JSON.
- **Request:** `multipart/form-data` with a `file` field.
- **Response:** `{ success: true, message: string }` or error message.
- **Example:**
  ```js
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  fetch('/api/upload', { method: 'POST', body: formData });
  ```

## Database Schema (Prisma)
See `/prisma/schema.prisma` for full schema. Example:
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  // ... other fields
}
```
Run migrations with:
```
npx prisma migrate dev
```

## Key Functions & Usage
### checkSession (src/lib/session.tsx)
```ts
export async function checkSession(): Promise<boolean> {
  // ...implementation
}
```
Usage:
```ts
const isLoggedIn = await checkSession();
```

### parseExcelAndSave (src/lib/parseExcelAndSave.ts)
```ts
export async function parseExcelAndSave(file: File, outputDir: string): Promise<string[]> {
  // ...implementation
}
```
Usage:
```ts
const files = await parseExcelAndSave(file, '/output/dir');
```

## Testing
- Tests are in `/tests/` using Jest.
- Example: `session_route.test.tsx` tests `/api/session` endpoint.
- Run tests:
```
npm test
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
- For file upload issues, verify MIME types and file size limits.

## Further Reading
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Jest Documentation](https://jestjs.io/docs)