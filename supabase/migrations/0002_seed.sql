-- Demo content so the site isn't empty on first run.
-- Replace with the real client's links, testimonials, and photography before launch.

insert into social_links (platform, label, username, description, url, sort_order) values
  ('instagram', 'Instagram', '@jordanblake.speaks', 'Behind the scenes from stages and studios.', 'https://instagram.com/', 1),
  ('linkedin', 'LinkedIn', 'Jordan Blake', 'Career insights and speaking updates for professionals.', 'https://linkedin.com/', 2),
  ('youtube', 'YouTube', 'Jordan Blake', 'Full keynotes, workshop clips, and résumé teardown videos.', 'https://youtube.com/', 3),
  ('tiktok', 'TikTok', '@jordanblake', 'Quick career tips in under 60 seconds.', 'https://tiktok.com/', 4),
  ('facebook', 'Facebook', 'Jordan Blake Speaks', 'Event announcements and community discussion.', 'https://facebook.com/', 5),
  ('x', 'X', '@jordanblake', 'Thoughts on careers, speaking, and the future of work.', 'https://x.com/', 6),
  ('whatsapp', 'WhatsApp', '+1 (555) 010-0142', 'Message directly for fast booking questions.', 'https://wa.me/15550100142', 7)
on conflict (platform) do nothing;

insert into testimonials (name, occupation, service_used, rating, quote, is_published, sort_order) values
  ('Maria Santos', 'VP of Operations, Halden Group', 'public_speaking', 5, 'Jordan opened our annual leadership summit and set the tone for the entire event. Practical, funny, and genuinely moving — our team is still talking about it.', true, 1),
  ('David Chen', 'Software Engineer', 'resume_writing', 5, 'I had 200+ applications go nowhere. Two weeks after the rewrite I had four interviews. The résumé finally sounded like someone who could do the job.', true, 2),
  ('Priya Nair', 'HR Director, Fieldstone Health', 'public_speaking', 5, 'We booked a half-day workshop on difficult conversations and it became the highest-rated session in our program history.', true, 3),
  ('Tom Whitfield', 'Recent MBA Graduate', 'career_coaching', 5, 'The coaching sessions gave me a framework for interviews I still use today. Direct feedback, no fluff, real results.', true, 4)
on conflict do nothing;

insert into portfolio_images (title, category, image_url, sort_order) values
  ('Keynote — Halden Group Leadership Summit', 'Speaking', '/portfolio/stage-01.svg', 1),
  ('Workshop — Difficult Conversations', 'Workshop', '/portfolio/stage-02.svg', 2),
  ('Panel — Future of Work Conference', 'Speaking', '/portfolio/stage-03.svg', 3),
  ('Studio Portrait', 'Portrait', '/portfolio/stage-04.svg', 4)
on conflict do nothing;
