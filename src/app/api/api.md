# API Handover Document

## Overview

The `src/app/api` directory contains all backend API endpoints for the project. These endpoints are designed to handle data operations such as session management, data saving, and retrieval for various features of the application.

### Directory Structure

```
src/app/api/
├── get-map-data/
│   └── route.ts
├── save-contact-data/
│   └── route.ts
├── save-map-data/
│   └── route.ts
├── save-student-data/
│   └── route.ts
├── session/
│   └── route.ts
├── upload/
│   └── route.ts
├── valid-rooms/
```

## Endpoint Summaries

### 1. `session/route.ts`
- **Purpose:** Checks if a user is currently logged in.
- **Method:** `GET`
- **Logic:** Calls `checkSession()` from `src/lib/session.tsx` to verify if a session exists and returns `{ isLoggedIn: boolean }`.
- **Reference:** <mcfile name="route.ts" path="src/app/api/session/route.ts"></mcfile>

### 2. `get-map-data/route.ts`, `save-map-data/route.ts`, `save-contact-data/route.ts`, `save-student-data/route.ts`
- **Purpose:** These endpoints are responsible for retrieving and saving map, contact, and student data.
- **Implementation:** Each file contains the logic for handling the respective data type. (See code for details.)

### 3. `upload/route.ts`
- **Status:** **Cancelled**
- **Note:** The upload feature was planned but has been cancelled during the development process. The file may still exist, but it is not in use and should not be considered part of the active API.

### 4. `valid-rooms/`
- **Status:** **Incomplete**
- **Note:** The implementation for valid rooms is not complete yet. There may be placeholder files or directories, but no working endpoint is currently available.

## Key Points

- **Session Management:** Handled via JWT tokens and cookies, with logic in `src/lib/session.tsx`.
- **Authentication:** Not directly in `api/`, but session status is checked via the `session` endpoint.
- **Data Endpoints:** Each data type (map, contact, student) has its own save and get endpoints.
- **Upload Feature:** Cancelled; related decision making details are in `DesignChanges.md` file under `main` branch.
- **Valid Rooms:** Not finished; do not rely on this endpoint.

## Recommendations for Future Developers

- **Complete** the `valid-rooms` endpoint to ensure rooms input by users are existed on the accommondation maps.
- **Refer to** `src/lib/session.tsx` for session logic and `src/app/actions/auth.tsx` for authentication actions.
- **Testing:** Ensure all endpoints are covered by tests, especially after changes.

## Related Files

- **Session Logic:** <mcfile name="session.tsx" path="src/lib/session.tsx"></mcfile>
- **Authentication Actions:** <mcfile name="auth.tsx" path="src/app/actions/auth.tsx"></mcfile>
- **Tests:** See `tests/` directory for endpoint and authentication tests.


        