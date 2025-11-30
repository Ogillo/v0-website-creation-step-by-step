-- KE 258 Lwanda CDC Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CHILDREN & SPONSORSHIP TABLES
-- =============================================

-- Children table - stores all children in the program
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('Male', 'Female')),
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  program_type VARCHAR(50) NOT NULL CHECK (program_type IN ('Child Survival', 'Sponsorship', 'Youth Development')),
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Graduated', 'Transferred', 'Inactive')),
  grade_level VARCHAR(50),
  school_name VARCHAR(200),
  health_status TEXT,
  special_needs TEXT,
  family_background TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sponsors table - stores sponsor information
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_code VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  address TEXT,
  sponsor_type VARCHAR(50) DEFAULT 'Individual' CHECK (sponsor_type IN ('Individual', 'Family', 'Organization', 'Church')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Paused')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sponsorships table - links children and sponsors
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  sponsor_id UUID NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Paused')),
  monthly_amount DECIMAL(10, 2) NOT NULL DEFAULT 38.00,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(child_id, sponsor_id, start_date)
);

-- =============================================
-- DONATIONS TABLES
-- =============================================

-- Donations table - tracks all donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name VARCHAR(200),
  donor_email VARCHAR(255),
  donor_phone VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  donation_type VARCHAR(50) NOT NULL CHECK (donation_type IN ('One-Time', 'Monthly', 'Annual')),
  purpose VARCHAR(100) NOT NULL CHECK (purpose IN ('General', 'Child Sponsorship', 'Education', 'Health', 'Infrastructure', 'Emergency')),
  payment_method VARCHAR(50) CHECK (payment_method IN ('Credit Card', 'Bank Transfer', 'Mobile Money', 'Paypal', 'Stripe')),
  transaction_id VARCHAR(255) UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE SET NULL,
  anonymous BOOLEAN DEFAULT FALSE,
  notes TEXT,
  donation_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- EVENTS TABLES
-- =============================================

-- Events table - stores all events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('Community', 'Fundraising', 'Training', 'Celebration', 'Outreach', 'Church Service')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  venue_details TEXT,
  capacity INTEGER,
  registration_required BOOLEAN DEFAULT FALSE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  featured_image TEXT,
  gallery_images TEXT[], -- Array of image URLs
  organizer VARCHAR(200),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  status VARCHAR(20) NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Draft', 'Scheduled', 'Ongoing', 'Completed', 'Cancelled')),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Event registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  participant_name VARCHAR(200) NOT NULL,
  participant_email VARCHAR(255) NOT NULL,
  participant_phone VARCHAR(50),
  number_of_attendees INTEGER DEFAULT 1,
  special_requirements TEXT,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  attendance_status VARCHAR(20) DEFAULT 'Registered' CHECK (attendance_status IN ('Registered', 'Confirmed', 'Attended', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- GALLERY TABLES
-- =============================================

-- Gallery items table
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('Image', 'Video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Community', 'Education', 'Health', 'Sponsorship', 'Youth Development', 'Volunteers', 'Celebrations', 'Infrastructure')),
  tags TEXT[],
  photographer VARCHAR(100),
  date_taken DATE,
  location VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- STORIES & TESTIMONIALS TABLES
-- =============================================

-- Stories table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  story_type VARCHAR(50) NOT NULL CHECK (story_type IN ('Child Story', 'Sponsor Story', 'Staff Story', 'Community Impact', 'Success Story')),
  featured_image TEXT,
  child_id UUID REFERENCES children(id) ON DELETE SET NULL,
  author VARCHAR(200),
  publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
  featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- CONTACT & COMMUNICATIONS TABLES
-- =============================================

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  contact_type VARCHAR(50) DEFAULT 'General' CHECK (contact_type IN ('General', 'Sponsorship', 'Volunteer', 'Partnership', 'Complaint', 'Feedback')),
  status VARCHAR(20) DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved', 'Closed')),
  assigned_to VARCHAR(100),
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(200),
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Unsubscribed', 'Bounced')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- VOLUNTEER TABLES
-- =============================================

-- Volunteer applications table
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  occupation VARCHAR(200),
  skills TEXT,
  areas_of_interest TEXT[],
  availability VARCHAR(100),
  start_date DATE,
  duration VARCHAR(100),
  previous_experience TEXT,
  motivation TEXT NOT NULL,
  references TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(50),
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Approved', 'Rejected', 'Active', 'Completed')),
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- PROGRAMS TABLES
-- =============================================

-- Programs table
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  program_type VARCHAR(50) NOT NULL CHECK (program_type IN ('Child Survival', 'Sponsorship', 'Youth Development')),
  objectives TEXT[],
  target_age_range VARCHAR(50),
  capacity INTEGER,
  current_enrollment INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Planning', 'Active', 'On Hold', 'Completed')),
  budget DECIMAL(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- REPORTS & STATISTICS TABLES
-- =============================================

-- Monthly statistics table
CREATE TABLE monthly_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month DATE NOT NULL UNIQUE,
  total_children INTEGER DEFAULT 0,
  new_enrollments INTEGER DEFAULT 0,
  total_sponsors INTEGER DEFAULT 0,
  new_sponsors INTEGER DEFAULT 0,
  total_donations DECIMAL(12, 2) DEFAULT 0,
  total_events INTEGER DEFAULT 0,
  volunteer_hours INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_children_status ON children(status);
CREATE INDEX idx_children_program_type ON children(program_type);
CREATE INDEX idx_sponsorships_child_id ON sponsorships(child_id);
CREATE INDEX idx_sponsorships_sponsor_id ON sponsorships(sponsor_id);
CREATE INDEX idx_sponsorships_status ON sponsorships(status);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_purpose ON donations(purpose);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_published ON gallery_items(is_published);
CREATE INDEX idx_stories_published ON stories(is_published);
CREATE INDEX idx_contact_status ON contact_submissions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsorships_updated_at BEFORE UPDATE ON sponsorships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_applications_updated_at BEFORE UPDATE ON volunteer_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_statistics_updated_at BEFORE UPDATE ON monthly_statistics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
