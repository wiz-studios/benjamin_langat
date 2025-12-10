import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migratePolitician() {
  console.log('\n📋 Migrating politician data...')

  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/politician.json'), 'utf-8')
  )

  const { error } = await supabase.from('politician').insert({
    name: data.name,
    title: data.title,
    bio: data.shortBio,
    photo: data.photo,
    email: data.email || '',
    phone: data.phone || '',
    social_links: data.socialLinks || {},
  })

  if (error) {
    console.error('❌ Error migrating politician:', error)
  } else {
    console.log('✅ Politician data migrated successfully')
  }
}

async function migrateBlogPosts() {
  console.log('\n📝 Migrating blog posts...')

  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/blog.json'), 'utf-8')
  )

  for (const post of data.posts) {
    const { error } = await supabase.from('blog_posts').insert({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
      images: post.images || [],
      captions: post.captions || [],
    })

    if (error) {
      console.error(`❌ Error migrating post "${post.title}":`, error)
    } else {
      console.log(`✅ Migrated: ${post.title}`)
    }
  }
}

async function migrateGallery() {
  console.log('\n🖼️  Migrating gallery albums and images...')

  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/gallery.json'), 'utf-8')
  )

  for (const album of data.albums) {
    // Insert album
    const { data: albumData, error: albumError } = await supabase
      .from('gallery_albums')
      .insert({
        name: album.name,
        description: album.description,
        cover_image: album.coverImage,
        order: album.id,
      })
      .select()
      .single()

    if (albumError) {
      console.error(`❌ Error migrating album "${album.name}":`, albumError)
      continue
    }

    console.log(`✅ Migrated album: ${album.name}`)

    // Insert images for this album
    for (let i = 0; i < album.images.length; i++) {
      const image = album.images[i]
      const { error: imageError } = await supabase.from('gallery_images').insert({
        album_id: albumData.id,
        src: image.src,
        caption: image.caption,
        order: i,
      })

      if (imageError) {
        console.error(`  ❌ Error migrating image:`, imageError)
      } else {
        console.log(`  ✅ Migrated image: ${image.caption.substring(0, 50)}...`)
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting data migration to Supabase...\n')
  console.log('⚠️  Make sure you have:')
  console.log('   1. Created your Supabase project')
  console.log('   2. Run the schema.sql in Supabase SQL Editor')
  console.log('   3. Set up .env.local with your credentials\n')

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  readline.question('Continue with migration? (yes/no): ', async (answer: string) => {
    if (answer.toLowerCase() !== 'yes') {
      console.log('Migration cancelled.')
      readline.close()
      return
    }

    try {
      await migratePolitician()
      // await migrateBlogPosts() // Already migrated
      // await migrateGallery() // Already migrated

      console.log('\n✅ Migration completed successfully!')
      console.log('\n📝 Next steps:')
      console.log('   1. Create an admin user in Supabase Auth')
      console.log('   2. Test the admin login at /admin/login')
      console.log('   3. Backup your JSON files')
      console.log('   4. Update your API routes to use Supabase')
    } catch (error) {
      console.error('\n❌ Migration failed:', error)
    }

    readline.close()
  })
}

main()
