
-- Seed CDF Allocations (Official Figures)
INSERT INTO public.cdf_allocations (financial_year, amount_allocated, amount_disbursed, status)
VALUES
    ('2025/2026', 202243910.00, 0, 'Allocated'),
    ('2024/2025', 188414052.19, 63000000.00, 'Allocated'), -- 63M verified disbursement
    ('2023/2024', 184129901.00, 0, 'Allocated'), -- Disbursement data pending
    ('2022/2023', 151960174.00, 0, 'Allocated')  -- Disbursement data pending
ON CONFLICT (financial_year) DO UPDATE SET
    amount_allocated = EXCLUDED.amount_allocated,
    amount_disbursed = EXCLUDED.amount_disbursed,
    status = EXCLUDED.status;

-- Seed Sample CDF Projects (Using generic/placeholder data for now as specific projects weren't provided in the brief)
INSERT INTO public.cdf_projects (title, description, sector, financial_year, amount, status, location, image_url)
VALUES
    ('Ainamoi Secondary School Computer Lab', 'Construction and equipping of a modern computer laboratory to enhance digital literacy.', 'Education', '2023/2024', 5000000, 'Completed', 'Ainamoi Ward', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'),
    ('Kapsoit Health Center Maternity Wing', 'Expansion of the maternity wing to increase bed capacity and improve maternal health services.', 'Health', '2022/2023', 8500000, 'Completed', 'Kapsoit', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'),
    ('Kipchimchim Water Project', 'Drilling and piping of water to serve 500 households in the Kipchimchim area.', 'Water', '2023/2024', 3200000, 'Ongoing', 'Kipchimchim', 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?auto=format&fit=crop&q=80&w=800'),
    ('Security Lighting Installation', 'Installation of high-mast floodlights in major market centers to improve security.', 'Security', '2024/2025', 12000000, 'Ongoing', 'Various Locations', 'https://images.unsplash.com/photo-1563245372-f21720e32aa0?auto=format&fit=crop&q=80&w=800'),
    ('Laliat Primary School Classrooms', 'Renovation of 4 classrooms and construction of 2 new ones.', 'Education', '2024/2025', 6000000, 'Planned', 'Laliat', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800');
