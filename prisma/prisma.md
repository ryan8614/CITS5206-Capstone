# Prisma Developer Handover Document

## Overview

This document provides all necessary information for developers to understand, maintain, and extend the Prisma database layer for this project.

---

## 1. Database Technology

- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: SQLite (see `datasource db` in `schema.prisma`)
- **Client Generator**: Prisma Client JS

---

## 2. Key Files

- `schema.prisma`: Main schema definition file for models, datasource, and generator.
- `dev.db`: SQLite database file (local development).
- `migrations/`: Directory containing migration history.
- `DEVELOPER_HANDOVER.md`: This handover document.

---

## 3. Schema Structure

### Models

- **User**
  - `id`: Integer, primary key, auto-incremented.
  - `createdAt`: DateTime, defaults to now.
  - `email`: String, unique.
  - `name`: String, unique.
  - `password`: String.

> Extend this section if you add more models.

---

## 4. Common Commands

- **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```

- **Run Migrations**
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

- **Open Prisma Studio (GUI)**
  ```bash
  npx prisma studio
  ```

## 5. Development Workflow
1. Edit schema.prisma to add or modify models.
2. Run migration to update the database schema.
3. Regenerate Prisma Client after schema changes.
4. Use Prisma Client in your code via:
   ```javascript
  import { PrismaClient } from '@prisma/client'
  const prisma = new PrismaClient()
  ```

## 6. Environment
- Local DB : SQLite ( file:./dev.db )
- Production : If deploying to production, update the provider and url in schema.prisma accordingly.

## 7. Troubleshooting
- If you encounter issues with migrations, try resetting the database:
  ```bash
  npx prisma migrate reset
  ```
  For client errors, ensure you have run npx prisma generate after schema changes.

## 8. Useful Links
- Prisma Docs
- Prisma CLI Reference