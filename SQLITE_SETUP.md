# 🔄 Quick SQLite Setup

If you're having trouble connecting to the Supabase PostgreSQL database, you can quickly switch to SQLite for local testing:

## 1. Install SQLite Adapter

```bash
npm install @payloadcms/db-sqlite --save
```

## 2. Update payload.config.ts

Replace the current `db` configuration:

```typescript
// In src/payload.config.ts
import { sqliteAdapter } from '@payloadcms/db-sqlite'

// ...existing imports...

export default buildConfig({
  // ...existing config...
  
  // Replace this:
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI,
  //   },
  // }),
  
  // With this:
  db: sqliteAdapter({
    db: './payload.db',
  }),
  
  // ...rest of config...
})
```

## 3. Update .env File

```properties
# Comment out the Supabase connection
# DATABASE_URI=postgresql://postgres:password@host:port/database

# Add SQLite flag if needed (optional)
USE_SQLITE=true

# Keep other environment variables
PAYLOAD_SECRET=ff316fe02e4b47229fdefbc5
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 4. Run Development Server

```bash
npm run dev
```

## 5. Seed the Database

After the server starts successfully:

```bash
npm run seed
```

## 6. Access the Admin Panel

Visit http://localhost:3000/admin and login with:

- Email: admin@weframetech.com
- Password: admin123

The SQLite database will be created as a file named `payload.db` in your project root directory. This provides a fully functional local environment for testing the application.

## Note on Production Deployment

SQLite is suitable for local development and testing, but for production, PostgreSQL is recommended for better performance and scalability. When deploying to production, switch back to the PostgreSQL adapter.
