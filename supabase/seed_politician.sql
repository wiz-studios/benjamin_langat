-- Migrate politician data from JSON to database
-- Run this ONCE in Supabase SQL Editor after admin_schema.sql

-- Delete all existing records first (should only be 1 politician anyway)
DELETE FROM public.politician;

INSERT INTO public.politician (
    name,
    title,
    bio,
    photo,
    email,
    phone,
    social_links,
    birth_date
) VALUES (
    'Hon. Amb. CPA Benjamin Kipkirui Langat, CBS',
    'Member of Parliament for Ainamoi Constituency',
    'Hon. Amb. CPA Benjamin Kipkirui Langat, CBS is the current Member of Parliament for Ainamoi Constituency and immediate former Kenya High Commissioner to Namibia. He also served as the Member of Parliament for Ainamoi Constituency in Kericho from 2008 to 2017. He holds a Master of Business Administration Degree in Accounting and Bachelor of Commerce Degree (Accounting Option) both from the University of Nairobi. He is also a fully qualified Certified Public Accountant and member of the Institute of Certified Public Accountants of Kenya in good standing. He was elected in the 2022 general election to Parliament under United Democratic Alliance (UDA).',
    '/Benjamin_Langat.jpg',
    'lkbenjami@yahoo.com',
    '+254722895939',
    '{"twitter": "#", "facebook": "https://www.facebook.com/AmbBenjaminLangat", "instagram": "#", "linkedin": "#"}'::jsonb,
    '24th November 1976'
);
