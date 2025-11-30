-- Row Level Security (RLS) Policies
-- Run this script after creating tables

-- Enable RLS on all tables
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_statistics ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PUBLIC READ POLICIES (No authentication required)
-- =============================================

-- Gallery items - public can view published items
CREATE POLICY "Public can view published gallery items"
  ON gallery_items FOR SELECT
  USING (is_published = true);

-- Stories - public can view published stories
CREATE POLICY "Public can view published stories"
  ON stories FOR SELECT
  USING (is_published = true);

-- Events - public can view published events
CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (is_published = true);

-- Programs - public can view active programs
CREATE POLICY "Public can view programs"
  ON programs FOR SELECT
  USING (status = 'Active');

-- Monthly statistics - public can view
CREATE POLICY "Public can view statistics"
  ON monthly_statistics FOR SELECT
  USING (true);

-- =============================================
-- PUBLIC WRITE POLICIES (Anonymous submissions)
-- =============================================

-- Contact submissions - anyone can submit
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Newsletter subscriptions - anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

-- Volunteer applications - anyone can apply
CREATE POLICY "Anyone can submit volunteer application"
  ON volunteer_applications FOR INSERT
  WITH CHECK (true);

-- Event registrations - anyone can register
CREATE POLICY "Anyone can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (true);

-- Donations - anyone can make donations (insert only)
CREATE POLICY "Anyone can submit donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- =============================================
-- ADMIN POLICIES (Authenticated users with admin role)
-- =============================================

-- Note: These policies assume you have authentication set up
-- You'll need to create a custom claim for admin users

-- Children - admin full access
CREATE POLICY "Admin full access to children"
  ON children FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Sponsors - admin full access
CREATE POLICY "Admin full access to sponsors"
  ON sponsors FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Sponsorships - admin full access
CREATE POLICY "Admin full access to sponsorships"
  ON sponsorships FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Donations - admin can view and update
CREATE POLICY "Admin full access to donations"
  ON donations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Events - admin full access
CREATE POLICY "Admin full access to events"
  ON events FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Event registrations - admin full access
CREATE POLICY "Admin full access to event registrations"
  ON event_registrations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Gallery - admin full access
CREATE POLICY "Admin full access to gallery"
  ON gallery_items FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Stories - admin full access
CREATE POLICY "Admin full access to stories"
  ON stories FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Contact submissions - admin can view and update
CREATE POLICY "Admin full access to contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Newsletter - admin can view and manage
CREATE POLICY "Admin full access to newsletter"
  ON newsletter_subscriptions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Volunteer applications - admin can view and manage
CREATE POLICY "Admin full access to volunteer applications"
  ON volunteer_applications FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Programs - admin full access
CREATE POLICY "Admin full access to programs"
  ON programs FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Statistics - admin full access
CREATE POLICY "Admin full access to statistics"
  ON monthly_statistics FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
