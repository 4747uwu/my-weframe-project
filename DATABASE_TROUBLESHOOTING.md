# 🔧 Database Connection Troubleshooting

This guide will help you resolve common connection issues with the Supabase PostgreSQL database used in this project.

## 🛑 Common Errors

### ENOTFOUND Error

If you see this error when running the application:

```
ERROR: Error: cannot connect to Postgres. Details: getaddrinfo ENOTFOUND db.yvuefrfkippsquvdjqjl.supabase.co
```

This indicates a DNS resolution issue where your system cannot resolve the Supabase database hostname.

### ETIMEDOUT Error

If you see this error:

```
ERROR: Error: cannot connect to Postgres. Details: connect ETIMEDOUT 2406:da1a:6b0:f601:bc0e:1ad9:c0d7:1326:5432
```
or
```
Test-NetConnection : TCP connect to (2406:da1a:6b0:f601:bc0e:1ad9:c0d7:1326 : 5432) failed
```

This indicates that the connection to the database server at the specified IP address and port is timing out. This is often due to:
- **Firewall rules**: Your local or network firewall might be blocking outbound connections to port 5432.
- **Supabase IP Allowlist**: The Supabase instance might not have your current public IP address added to its allowlist.
- **Network routing issues**: Problems along the network path between your machine and the Supabase server.

## ✅ Solutions

### 1. Verify Database Connection String

Check that your `.env` file contains the correct connection string:

```properties
DATABASE_URI=postgresql://postgres:YOUR_PASSWORD_HERE@YOUR_SUPABASE_HOST:5432/postgres
```
Ensure `YOUR_PASSWORD_HERE` and `YOUR_SUPABASE_HOST` are correctly set.

### 2. Try using Direct IP Address (for ENOTFOUND)

If DNS resolution is failing (you see `ENOTFOUND`), you can try replacing the hostname with its IP address:

1. Find the IP address of your Supabase database:
   ```powershell
   nslookup YOUR_SUPABASE_HOST
   ```
   Replace `YOUR_SUPABASE_HOST` with the actual host from your connection string (e.g., `db.yvuefrfkippsquvdjqjl.supabase.co`).
   
2. Update your DATABASE_URI with the IP address:
   ```properties
   DATABASE_URI=postgresql://postgres:YOUR_PASSWORD_HERE@[IP_ADDRESS]:5432/postgres
   ```
   Replace `[IP_ADDRESS]` with the address obtained from `nslookup`.

### 3. Check Network Connectivity & Firewall

- **Firewall Settings**:
    - Ensure your local machine's firewall (Windows Firewall, or any third-party firewall software) allows outbound TCP connections on port 5432.
    - If you are on a corporate or managed network, check if there's a network-level firewall blocking the connection. You might need to contact your network administrator.
- **VPN Conflicts**: Disable any VPNs that might interfere with network connections or DNS resolution.
- **DNS Servers**: (Primarily for `ENOTFOUND` issues) Try using alternative DNS servers (like Google's 8.8.8.8 or Cloudflare's 1.1.1.1).

### 4. Verify Supabase Configuration & IP Allowlist

1. Login to your Supabase dashboard.
2. Go to **Project Settings** > **Database**.
3. Under **Connection info**, ensure all details match your `.env` file.
4. Go to **Network Restrictions** (this might be under Database settings or a separate section like "Network Bans" or "IP Allow List").
   - **Ensure your current public IP address is added to the allowlist.** Supabase might restrict connections to only known IP addresses for security. You can find your public IP by searching "what is my IP" on Google.
   - If you are using an IPv6 address in your connection string (like `2406:da1a:6b0:f601:bc0e:1ad9:c0d7:1326`), ensure Supabase supports and is configured for IPv6 connections and that your IPv6 address is allowlisted. Sometimes, it's more reliable to use the IPv4 address if available.
5. Check **Connection Pooling** settings if you are using a pooled connection string. The direct connection string usually bypasses the pooler.

### 5. Local Development Alternative

For local development, you can use a local PostgreSQL instance or SQLite:

#### Setting up a Local PostgreSQL Database:

1. Install PostgreSQL locally
2. Create a database
3. Update your `.env` file:
   ```properties
   DATABASE_URI=postgresql://postgres:password@localhost:5432/payload
   ```

#### Using SQLite (Temporary Testing Only):

1. Install the SQLite adapter:
   ```bash
   npm install @payloadcms/db-sqlite --save
   ```

2. Update your payload.config.ts:
   ```typescript
   import { buildConfig } from 'payload/config'
   import { sqliteAdapter } from '@payloadcms/db-sqlite'

   export default buildConfig({
     db: sqliteAdapter({
       filename: 'payload.db',
     }),
     // rest of your config
   })
   ```

3. Remove the DATABASE_URI from your `.env` file

### 6. Vercel Deployment Considerations

When deploying to Vercel, ensure:

1. All environment variables are properly configured in the Vercel dashboard
2. Your Supabase database allows connections from Vercel's IP range
3. If using "output: standalone" in Next.js, use Node.js 18.x or later

## 🔄 Testing Your Connection

To test if you can connect to the database:

```powershell
# Check DNS resolution (if using hostname)
nslookup YOUR_SUPABASE_HOST 
# Example: nslookup db.yvuefrfkippsquvdjqjl.supabase.co

# Test TCP connection to database port (use IP address if DNS fails or for ETIMEDOUT)
Test-NetConnection -ComputerName YOUR_SUPABASE_HOST_OR_IP -Port 5432
# Example with hostname: Test-NetConnection -ComputerName db.yvuefrfkippsquvdjqjl.supabase.co -Port 5432
# Example with IP: Test-NetConnection -ComputerName 2406:da1a:6b0:f601:bc0e:1ad9:c0d7:1326 -Port 5432
```

If `Test-NetConnection` fails with `TCP connect to (...) failed` or times out, it strongly suggests a network block (firewall, IP allowlist) or routing issue.

If the connection works with `Test-NetConnection` but the application still fails, there might be authentication or permission issues with the database user, or an issue within the application's database client configuration.

## 📣 Need More Help?

If you continue to experience connection issues:

1. Try accessing the Supabase dashboard directly to verify the database is online
2. Check if the database credentials are still valid
3. Look for any recent changes to networking or firewall configurations

Remember that database connection errors might also occur if:
- The database server is under maintenance
- The connection limit has been reached
- The database has been paused due to inactivity
