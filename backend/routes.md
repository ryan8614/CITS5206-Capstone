## **📘 API Endpoint Reference**



**This document describes the usage of two backend endpoints defined in your Next.js App Router: Session Check and File Upload. These routes provide essential functionality for frontend developers working on authentication flow and file handling.**



------

#### **📂 File 1: src/app/api/session/route.ts**

##### **📎Endpoint:**

 GET /api/session

##### **✅Purpose**

Checks whether a user is currently authenticated by validating the session on the server. This is useful for rendering protected components or routing users accordingly.

##### **🚗Response Format**

```json
{
  "isLoggedIn": true
}
```

- isLoggedIn — A boolean value indicating whether the session is active.

##### **🛠️ Frontend Usage Example (Next.js + fetch)**

```
const res = await fetch('/api/session');
const data = await res.json();

if (data.isLoggedIn) {
  // Show authenticated content
} else {
  // Redirect to login page
}
```

##### **🧠 Developer Notes**

- Internally calls checkSession() from @/lib/session.
- This is a **stateless GET request**—no body or headers are required.
- Can be polled or triggered on initial load to gate access to protected pages.



------



#### **📂 File 2:  src/app/api/upload/route.ts**

##### **📎 Endpoint:** 

POST /api/upload

##### **✅ Purpose**

Receives a single uploaded file via multipart/form-data and processes it on the server. This could be adapted to store the file locally, in a database, or cloud storage like AWS S3.

##### **🧪 Request Format**

- Content-Type: multipart/form-data
- Field name: file

##### **🛠️ Example in frontend (TypeScript)**

```typescript
const formData = new FormData();
formData.append('file', selectedFile);

const res = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const result = await res.json();
console.log(result.message);  // e.g., "File uploaded successfully"
```

##### **🚗 Response Format**

```json
{
  "message": "File uploaded successfully"
}
```

Or if no file is included:

```json
{
  "error": "No file uploaded"
}
```

##### **🧠 Developer Notes**

- Built with the Next.js App Router API (handler-style route).
- Currently supports one file at a time.
- Can be extended with:
  - File validation
  - Storage in cloud services
  - Logging upload activity
- The server expects a field named file.



------



#### **🔗 Additional Tips**

- These API routes live under /api/... and follow RESTful patterns.
- Make sure route imports use the alias paths (e.g., @/lib/...) and are defined in your tsconfig.json under paths.
- If using a custom fetch hook, you can wrap requests to these endpoints with loading and error states.



