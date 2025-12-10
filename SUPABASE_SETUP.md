# Supabase Setup Guide

Follow these steps to complete the Supabase migration.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `benjamin-langat-website`
   - **Database Password**: (generate a strong password and save it)
   - **Region**: Choose closest to Kenya (e.g., Singapore or Frankfurt)
5. Click "Create new project" (takes ~2 minutes)

---

## Step 2: Get Your Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ keep this secret!)

3. Create `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

---

## Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click "Run" (bottom right)
6. Verify success: You should see "Success. No rows returned"

---

## Step 4: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your admin email
   - **Password**: create a strong password
   - **Auto Confirm User**: ✅ (check this box)
4. Click "Create user"

---

## Step 5: Run Data Migration

1. Install dependencies (if not already done):
   ```bash
   npm install dotenv tsx --save-dev
   ```

2. Run the migration script:
   ```bash
   npx tsx scripts/migrate-to-supabase.ts
   ```

3. Type `yes` when prompted
4. Wait for migration to complete

---

## Step 6: Verify Migration

1. In Supabase dashboard, go to **Table Editor**
2. Check each table has data:
   - `politician` (should have 1 row)
   - `blog_posts` (should have your posts)
   - `gallery_albums` (should have your albums)
   - `gallery_images` (should have your images)

---

## Step 7: Test Admin Login

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin/login`
3. Log in with the admin email/password you created
4. You should be redirected to `/admin`

---

## Step 8: Update API Routes

The following files need to be updated to use Supabase:
- `app/api/blog/route.ts`
- `app/api/gallery/route.ts`
- `app/api/politician/route.ts` (new)

These will be updated in the next phase.

---

## Troubleshooting

### "Invalid API key" error
- Check that your `.env.local` file exists and has the correct keys
- Restart your dev server after creating `.env.local`

### Migration script fails
- Make sure you ran the schema.sql first
- Check that your service_role key is correct
- Verify your Supabase project is active

### Can't log in
- Make sure you checked "Auto Confirm User" when creating the admin user
- Try resetting the password in Supabase dashboard

---

## Security Notes

⚠️ **NEVER commit `.env.local` to git**
⚠️ **NEVER expose your service_role key to the client**
✅ The `anon` key is safe to expose (it's public)
✅ Row-level security protects your data even with the anon key
