# Backend Architecture Documentation

## Overview
The KE 258 Lwanda CDC website backend is built using Next.js API Routes with a PostgreSQL database (Supabase/Neon) and Vercel Blob for file storage.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │  Admin   │  │Components│  │  Hooks   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Next.js API Routes)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Stories  │  │  Events  │  │ Contact  │  │Volunteers│   │
│  │   API    │  │   API    │  │   API    │  │   API    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
└───────┼─────────────┼──────────────┼─────────────┼──────────┘
        │             │              │             │
        ▼             ▼              ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────────────┐  ┌──────────────────────┐    │
│  │   PostgreSQL Database    │  │    Vercel Blob       │    │
│  │  (Supabase/Neon)         │  │  (Image Storage)     │    │
│  │                          │  │                      │    │
│  │  • Stories               │  │  • Program Images    │    │
│  │  • Events                │  │  • Story Images      │    │
│  │  • Programs              │  │  • Gallery Items     │    │
│  │  • Gallery Items         │  │  • Event Images      │    │
│  │  • Contact Submissions   │  │  • Team Photos       │    │
│  │  • Newsletter Subs       │  │                      │    │
│  │  • Volunteer Apps        │  │                      │    │
│  │  • Donations             │  │                      │    │
│  └──────────────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## API Endpoints

### Stories API
- `GET /api/stories` - List all stories (with filtering)
- `GET /api/stories/[id]` - Get single story
- `POST /api/stories` - Create new story (admin)
- `PUT /api/stories/[id]` - Update story (admin)
- `DELETE /api/stories/[id]` - Delete story (admin)

### Events API
- `GET /api/events` - List all events
- `GET /api/events/[id]` - Get single event
- `POST /api/events` - Create new event (admin)
- `PUT /api/events/[id]` - Update event (admin)
- `DELETE /api/events/[id]` - Delete event (admin)

### Programs API
- `GET /api/programs` - List all programs
- `GET /api/programs/[slug]` - Get program by slug

### Gallery API
- `GET /api/gallery` - List gallery items
- `POST /api/gallery` - Add gallery item (admin)
- `DELETE /api/gallery/[id]` - Delete gallery item (admin)

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List submissions (admin)

### Newsletter API
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - List subscribers (admin)

### Volunteers API
- `POST /api/volunteers` - Submit application
- `GET /api/volunteers` - List applications (admin)
- `PUT /api/volunteers/[id]` - Update application status (admin)

### Upload API
- `POST /api/upload` - Upload file to Vercel Blob

### Images API
- `GET /api/images/list` - List uploaded images
- `DELETE /api/images/delete` - Delete image

## Database Schema

See `scripts/001-create-database-schema.sql` for complete schema.

### Key Tables:
1. **stories** - Blog posts and testimonials
2. **events** - Community events and activities
3. **programs** - Child development programs
4. **gallery_items** - Photos and videos
5. **contact_submissions** - Contact form entries
6. **newsletter_subscriptions** - Email subscribers
7. **volunteer_applications** - Volunteer applications
8. **donations** - Donation records

## Data Flow

### Example: Creating a Story

\`\`\`
1. Admin fills form in /admin/content
2. Form submits to POST /api/stories
3. API validates data
4. API saves to database
5. API returns success response
6. Frontend updates UI
7. New story appears on /stories page
\`\`\`

### Example: Contact Form Submission

\`\`\`
1. User fills contact form
2. Form submits to POST /api/contact
3. API validates data
4. API saves to database
5. API sends email notification
6. API returns success message
7. User sees confirmation
\`\`\`

## Security Considerations

1. **Input Validation** - All API routes validate input data
2. **Rate Limiting** - Prevent spam and abuse
3. **Authentication** - Admin routes require authentication
4. **CORS** - Configured for security
5. **SQL Injection Prevention** - Using parameterized queries
6. **XSS Prevention** - Sanitizing user input

## Environment Variables

\`\`\`env
# Database
DATABASE_URL=postgresql://...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=...

# Email (for notifications)
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...

# Admin Authentication
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...
\`\`\`

## Next Steps

1. **Connect Database** - Set up Supabase or Neon
2. **Run Migrations** - Execute SQL schema
3. **Configure Environment** - Add environment variables
4. **Test APIs** - Verify all endpoints work
5. **Add Authentication** - Secure admin routes
6. **Deploy** - Push to production
