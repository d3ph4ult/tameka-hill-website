-- Demo content so the site isn't empty on first run.
-- Replace with the real client's links, testimonials, and photography before launch.

insert into social_links (platform, label, username, description, url, sort_order) values
  ('instagram', 'Instagram', '@iamtamekahill', 'Behind the scenes from stages and studios.', 'https://www.instagram.com/iamtamekahill', 1),
  ('linkedin', 'LinkedIn', 'Tameka Hill', 'Career insights and speaking updates for professionals.', 'https://www.linkedin.com/in/iamtamekahill', 2),
  ('youtube', 'YouTube', 'Meek at Heart', 'Full keynotes, workshop clips, and résumé teardown videos.', 'https://youtube.com/@meekatheart', 3),
  ('tiktok', 'TikTok', '@tamekahill', 'Quick career tips in under 60 seconds.', 'https://tiktok.com/', 4),
  ('facebook', 'Facebook', 'Tameka Hill Speaks', 'Event announcements and community discussion.', 'https://www.facebook.com/share/18mjPHUJYW/', 5),
  ('x', 'X', '@meeks_ja', 'Thoughts on careers, speaking, and the future of work.', 'https://x.com/meeks_ja', 6),
  ('whatsapp', 'WhatsApp', '+1 876-833-6463', 'Message directly for fast booking questions.', 'https://wa.me/18768336463', 7)
on conflict (platform) do nothing;

-- Résumé-writing testimonials are shown as image proof (see the "resume
-- testimonials" images on the homepage) rather than text quotes, so no
-- resume_writing row is seeded here.
insert into testimonials (name, occupation, service_used, rating, quote, is_published, sort_order) values
  ('Maria Santos', 'VP of Operations, Halden Group', 'public_speaking', 5, 'Tameka opened our annual leadership summit and set the tone for the entire event. Practical, funny, and genuinely moving — our team is still talking about it.', true, 1),
  ('Priya Nair', 'HR Director, Fieldstone Health', 'public_speaking', 5, 'We booked a half-day workshop on difficult conversations and it became the highest-rated session in our program history.', true, 3),
  ('Tom Whitfield', 'Recent MBA Graduate', 'career_coaching', 5, 'The coaching sessions gave me a framework for interviews I still use today. Direct feedback, no fluff, real results.', true, 4)
on conflict do nothing;

insert into portfolio_images (title, category, image_url, sort_order) values
  ('Panel Interview — Studio Session', 'Interview', '/portfolio/interview-01.jpg', 1),
  ('Panel Interview — Behind the Scenes', 'Interview', '/portfolio/interview-02.jpg', 2),
  ('Full House Podcast — Live Set', 'Podcast', '/portfolio/podcast-set.jpg', 3),
  ('Studio Portrait', 'Portrait', '/portfolio/studio-portrait.jpg', 4)
on conflict do nothing;
