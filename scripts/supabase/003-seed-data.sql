-- Sample seed data for testing
-- Run this script after creating tables and RLS policies

-- Insert sample children
INSERT INTO children (first_name, last_name, date_of_birth, gender, registration_number, program_type, grade_level, school_name) VALUES
('John', 'Omondi', '2015-03-15', 'Male', 'KE258-001', 'Sponsorship', 'Grade 4', 'Lwanda Primary School'),
('Mary', 'Achieng', '2016-07-22', 'Female', 'KE258-002', 'Sponsorship', 'Grade 3', 'Lwanda Primary School'),
('David', 'Otieno', '2014-11-08', 'Male', 'KE258-003', 'Sponsorship', 'Grade 5', 'Lwanda Primary School'),
('Grace', 'Nekesa', '2017-05-30', 'Female', 'KE258-004', 'Child Survival', 'Kindergarten', 'Lwanda Early Learning Center'),
('Peter', 'Wafula', '2013-09-12', 'Male', 'KE258-005', 'Youth Development', 'Grade 6', 'Lwanda Primary School');

-- Insert sample programs
INSERT INTO programs (name, slug, description, program_type, target_age_range, capacity, current_enrollment, start_date, budget) VALUES
('Child Survival Intervention', 'child-survival', 'Supporting pregnant mothers and children 0-5 years with healthcare, nutrition, and parental training', 'Child Survival', '0-5 years', 100, 45, '2010-01-01', 50000.00),
('Child Sponsorship Program', 'sponsorship', 'One-to-one sponsorship providing education, healthcare, and spiritual development for children', 'Sponsorship', '6-18 years', 500, 324, '2010-01-01', 150000.00),
('Youth Development Program', 'youth-development', 'Leadership training, vocational skills, and career preparation for young adults', 'Youth Development', '15-22 years', 150, 87, '2012-01-01', 75000.00);

-- Insert sample events
INSERT INTO events (title, slug, description, event_type, start_date, end_date, location, capacity, registration_required, featured_image, status, is_published) VALUES
('Annual Fundraising Gala', 'annual-gala-2024', 'Join us for an evening of celebration and support for our children', 'Fundraising', '2024-12-15 18:00:00', '2024-12-15 22:00:00', 'Lwanda Community Hall', 200, true, '/events/gala-2024.jpg', 'Scheduled', true),
('Youth Leadership Camp', 'youth-camp-2024', 'Three-day camp for leadership development and team building', 'Training', '2024-08-20 09:00:00', '2024-08-22 17:00:00', 'Lake Victoria Retreat Center', 50, true, '/events/youth-camp.jpg', 'Completed', true),
('Community Health Fair', 'health-fair-2024', 'Free health screenings and wellness education for families', 'Community', '2024-06-10 08:00:00', '2024-06-10 16:00:00', 'Lwanda Health Center', 500, false, '/events/health-fair.jpg', 'Completed', true);

-- Insert sample gallery items
INSERT INTO gallery_items (title, description, media_type, media_url, category, tags, featured, is_published) VALUES
('Children Learning Together', 'Students engaged in classroom activities', 'Image', '/gallery/classroom-learning.jpg', 'Education', ARRAY['education', 'classroom', 'learning'], true, true),
('Health Screening Day', 'Medical professionals conducting health checks', 'Image', '/gallery/health-screening.jpg', 'Health', ARRAY['health', 'medical', 'screening'], true, true),
('Youth Soccer Match', 'Young athletes playing in the community soccer tournament', 'Image', '/gallery/soccer-match.jpg', 'Youth Development', ARRAY['sports', 'youth', 'soccer'], false, true),
('Graduation Ceremony', 'Proud graduates celebrating their achievements', 'Image', '/gallery/graduation-2024.jpg', 'Celebrations', ARRAY['graduation', 'ceremony', 'achievement'], true, true),
('Community Garden Project', 'Volunteers and children working in the community garden', 'Image', '/gallery/garden-project.jpg', 'Community', ARRAY['agriculture', 'community', 'sustainability'], false, true);

-- Insert sample stories
INSERT INTO stories (title, slug, excerpt, content, story_type, featured_image, publication_date, featured, is_published) VALUES
('From Struggling Student to Top Performer', 'john-success-story', 'John''s journey from academic difficulties to becoming the top student in his class', 'John Omondi joined our program three years ago, struggling with basic reading and math. Through dedicated tutoring, nutritional support, and encouragement from his sponsor, John has transformed into a confident learner. He recently scored the highest marks in his grade and dreams of becoming a doctor to serve his community.', 'Child Story', '/stories/john-success.jpg', '2024-01-15', true, true),
('A Sponsor''s Perspective', 'sponsor-sarah-story', 'Sarah shares her rewarding experience sponsoring Mary for five years', 'When I first decided to sponsor a child, I had no idea how much it would change my life. Watching Mary grow, receiving her letters, and seeing her progress reports has been incredibly fulfilling. Last year, I visited Kenya and met Mary in person - it was one of the most emotional and beautiful moments of my life.', 'Sponsor Story', '/stories/sponsor-visit.jpg', '2024-02-20', true, true);

-- Insert sample monthly statistics
INSERT INTO monthly_statistics (month, total_children, new_enrollments, total_sponsors, new_sponsors, total_donations, total_events, volunteer_hours) VALUES
('2024-01-01', 320, 12, 280, 8, 45000.00, 3, 240),
('2024-02-01', 324, 4, 285, 5, 38000.00, 2, 180),
('2024-03-01', 324, 0, 290, 5, 42000.00, 4, 320);

-- Insert sample newsletter subscriptions
INSERT INTO newsletter_subscriptions (email, name, status) VALUES
('supporter1@example.com', 'John Doe', 'Active'),
('supporter2@example.com', 'Jane Smith', 'Active'),
('supporter3@example.com', 'Mike Johnson', 'Active');
