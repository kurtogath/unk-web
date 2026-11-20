-- 002_staff_seed.sql
-- Datos iniciales de staff, tomados de src/app/page.tsx (rama kurto).
-- A partir de aquí se mantienen desde el CRM.
--
-- ON CONFLICT DO NOTHING: si se vuelve a ejecutar, no pisa los cambios hechos
-- desde el CRM.

INSERT INTO staff (name, instagram_handle, avatar, sort_order) VALUES
    ('Dario',    'darioxgd',  '/dario.png',    1),
    ('Kurto',    'kurtogath', '/kurto.png',    2),
    ('Tresillo', 'tresilllo', '/tresillo.png', 3)
ON CONFLICT (name) DO NOTHING;
