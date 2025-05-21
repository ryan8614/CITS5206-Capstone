# Authentication Actions Handover Document

## File Location
- **Path:** `src/app/actions/auth.tsx`

## Purpose
This file defines server-side authentication actions for user signup, signin, and logout. It handles user registration, login, and session management using Prisma (for database), bcryptjs (for password hashing), and custom session utilities.

---

## Key Functions

### 1. `signup(state: FormState, formData: FormData)`
- **Purpose:** Registers a new user.
- **Flow:**
  1. Validates form data using `SignupFormSchema`.
  2. Checks if the username or email already exists in the database.
  3. Hashes the password using bcrypt.
  4. Creates a new user in the database.
  5. Returns a success message or validation errors.
- **Returns:** `{ message: string, errors: object }` on success or error.

### 2. `signin(state: FormState, formData: FormData)`
- **Purpose:** Authenticates an existing user.
- **Flow:**
  1. Validates form data using `SigninFormSchema`.
  2. Looks up the user by username.
  3. Compares the provided password with the stored hashed password.
  4. If successful, creates a session for the user.
  5. Returns a success message or error details.
- **Returns:** `{ message: string, errors: object }` on success or error.

### 3. `logout()`
- **Purpose:** Logs out the current user by deleting their session.
- **Flow:** Calls `deleteSession()` from the session utility.
- **Returns:** `void`

---

## Dependencies

- **PrismaClient:** For database operations (`@prisma/client`).
- **bcryptjs:** For password hashing and comparison.
- **Session Utilities:** `createSession`, `deleteSession` from `@/lib/session`.
- **Validation Schemas:** `SignupFormSchema`, `SigninFormSchema` from `@/lib/definitions`.

---

## Data Flow

- **Signup:**
  - Receives form data → Validates → Checks for duplicates → Hashes password → Stores user → Returns result.
- **Signin:**
  - Receives form data → Validates → Finds user → Checks password → Creates session → Returns result.
- **Logout:**
  - Deletes session cookie.

---

## Error Handling

- Validation errors are returned as an `errors` object keyed by field.
- Database errors are not deeply handled; consider adding try/catch for production robustness.
- Password and user existence errors are user-friendly.

---

## Extending Functionality

- **Add fields:** Update validation schemas and Prisma model.
- **Add OAuth:** Integrate with session utilities and extend signin logic.
- **Improve error handling:** Add try/catch blocks and logging as needed.

---

## Related Files

- **Session Management:** `src/lib/session.tsx`
- **Validation Schemas:** `src/lib/definitions.ts`
- **Prisma Schema:** `prisma/schema.prisma`
- **Frontend Forms:** `src/app/ui/signin-form.tsx`, `src/app/ui/signup-form.tsx`
- **Tests:** `tests/auth.test.tsx`

---

## Testing

- Unit tests for signup, signin, and logout are in `tests/auth.test.tsx`.
- Tests mock Prisma, bcrypt, and session utilities for isolated logic validation.

---

## Environment Variables

- **SESSION_SECRET:** Used for session encryption (see `src/lib/session.tsx`).

---

## Contact

For further questions, refer to the code comments or contact the previous developer.
