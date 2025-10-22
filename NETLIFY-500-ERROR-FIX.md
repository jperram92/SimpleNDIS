# Netlify 500 Error Diagnosis & Fix

## Problem

Site builds successfully but returns **500 Internal Server Error** when accessed. This indicates a runtime issue after deployment.

## Root Causes Identified

### 1. ✅ FIXED: Outdated Netlify Plugin

- **Issue**: `@netlify/plugin-nextjs@4.41.3` is very outdated (latest: v5.14.3)
- **Impact**: Old plugin may have bugs/incompatibilities with Next.js 14
- **Fix Applied**: Updated to `@netlify/plugin-nextjs@5.14.3` in `netlify.toml`
- **Commit**: d6f20eb

### 2. ✅ FIXED: API Rewrite Conflict

- **Issue**: The `/api/*` rewrite in `netlify.toml` was redirecting to itself:
  ```toml
  [[redirects]]
    from = "/api/*"
    to = "/api/:splat"
    status = 200
  ```
- **Impact**: This conflicted with Next.js API route handling, causing 500 errors on:
  - `/api/auth/[...nextauth]` (NextAuth endpoints)
  - `/api/csrf-token` (CSRF protection)
  - `/api/audit/log` (Audit logging)
- **Fix Applied**: Removed the conflicting rewrite rule
- **Commit**: d6f20eb

### 3. ⚠️ NEEDS VERIFICATION: Environment Variables

Your NextAuth configuration requires these environment variables on Netlify:

**Critical Variables:**

```
NEXTAUTH_SECRET     - Random secret for JWT signing
NEXTAUTH_URL        - Already set (you confirmed this)
DATABASE_URL        - PostgreSQL connection string
```

**Status from deployment logs:**

- ✅ `NEXTAUTH_URL` - Already set by user
- ❌ `NEXTAUTH_SECRET` - Needs verification
- ❌ `DATABASE_URL` - Needs verification

## Next Steps to Verify the Fix

### Step 1: Trigger a New Deployment

The new Netlify plugin should auto-update, but you may want to trigger a redeploy:

1. Go to Netlify Dashboard → Deploys
2. Click "Trigger deploy" → "Deploy site" to force rebuild with the new plugin

### Step 2: Check Environment Variables on Netlify

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Verify these variables are set:
   - `NEXTAUTH_SECRET`: Should be a random string (e.g., generated via `openssl rand -base64 32`)
   - `DATABASE_URL`: Should be your PostgreSQL connection string
   - Any OAuth provider credentials if using them

### Step 3: If Still Getting 500 Error

Check the Netlify function logs:

1. Go to **Deploys** → Latest deploy
2. Click **Functions** tab or **Logs** tab
3. Look for error messages showing what's actually failing

## Files Modified

- ✅ `netlify.toml` - Updated plugin version and removed conflicting rewrite

## Git History

- d6f20eb: `fix: Update to latest Netlify Next.js plugin and remove conflicting API rewrite`
- adc75c4: `docs: Add comprehensive Netlify deployment fix documentation`
- (Previous commits from styled-jsx fix)

## Technical Details

### Why the rewrite was problematic:

The Netlify rewrite rule was unnecessary because:

1. Next.js already handles API routes internally
2. The rewrite created a circular redirect: `/api/* → /api/:splat`
3. This prevented proper routing to API handlers in serverless functions
4. The Next.js Runtime plugin handles this automatically

### Why the plugin version matters:

- v4.x: Released ~2 years ago, may have bugs with Next.js 14
- v5.x: Latest, optimized for current Next.js versions
- The newer plugin includes fixes for:
  - Proper edge function deployment
  - Better serverless function bundling
  - Improved Next.js 14 compatibility

## Expected Outcome

After deployment with these fixes:

- ✅ Styled-jsx module resolution working (already fixed)
- ✅ API routes responding properly (no more routing conflicts)
- ✅ NextAuth should work if environment variables are set
- ✅ Site should load without 500 errors

## Troubleshooting If Issues Persist

**Still seeing 500 errors?**

1. Check Netlify function logs for actual error message
2. Verify DATABASE_URL format matches Prisma requirements
3. Ensure NEXTAUTH_SECRET is set and not empty
4. Check if Prisma migrations have been run on the database

**NextAuth-specific issues?**

- NextAuth redirects to `/auth/signin` on auth errors
- Check browser DevTools → Network tab for failed requests
- Look for CORS or redirect chain issues

**Database connection issues?**

- Verify DATABASE_URL contains proper PostgreSQL credentials
- Check if database server is accessible from Netlify
- Ensure Prisma migrations are applied to the database

## References

- [Netlify Next.js Plugin v5 Docs](https://docs.netlify.com/integrations/frameworks/next-js/)
- [NextAuth.js Deployment Guide](https://next-auth.js.org/deployment)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
