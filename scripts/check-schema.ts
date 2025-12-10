import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkSchema() {
    console.log('🔍 Checking database schema...')

    // Check for politician table
    const { error: error1 } = await supabase.from('politician').select('count', { count: 'exact', head: true })

    // Check for blog_posts table
    const { error: error2 } = await supabase.from('blog_posts').select('count', { count: 'exact', head: true })

    if (error1 || error2) {
        console.error('❌ Schema check failed. Tables might be missing.')
        if (error1) console.error('   - politician table:', error1.message)
        if (error2) console.error('   - blog_posts table:', error2.message)
        console.log('\n⚠️  Please run the content of supabase/schema.sql in the Supabase SQL Editor.')
        process.exit(1)
    } else {
        console.log('✅ Schema looks correct! Tables exist.')
        process.exit(0)
    }
}

checkSchema()
