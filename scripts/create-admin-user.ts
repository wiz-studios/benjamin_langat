import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as readline from 'readline'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    console.error('   Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve)
    })
}

async function createAdminUser() {
    console.log('\n👤 Create Supabase Admin User')
    console.log('=============================')

    try {
        const email = await question('Email: ')
        const password = await question('Password (min 6 chars): ')

        if (password.length < 6) {
            console.error('❌ Password must be at least 6 characters')
            rl.close()
            return
        }

        console.log('\nCreating user...')

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm the user
            user_metadata: { role: 'admin' } // Optional: Set a metadata role if your app uses it
        })

        if (error) {
            console.error('❌ Error creating user:', error.message)
        } else {
            console.log('✅ User created successfully!')
            console.log(`   ID: ${data.user.id}`)
            console.log(`   Email: ${data.user.email}`)
            console.log('\nYou can now log in with these credentials.')
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err)
    } finally {
        rl.close()
    }
}

createAdminUser()
