-- 001_staff.sql
-- Personas que firman el proyecto ("Signed by"): nombre, Instagram y avatar.
--
-- Se guarda solo el usuario de Instagram (sin @ ni URL); la URL se construye en
-- el código: https://www.instagram.com/<instagram_handle>/
--
-- Requiere la función set_updated_at(), ya existente en la BBDD (la usa news).

CREATE TABLE staff (
    id               bigserial PRIMARY KEY,
    name             varchar(50) NOT NULL UNIQUE,
    instagram_handle varchar(30) NOT NULL UNIQUE
                     CONSTRAINT staff_instagram_handle_valid CHECK (instagram_handle ~ '^[A-Za-z0-9._]{1,30}$'),
    avatar           text
                     CONSTRAINT staff_avatar_not_empty CHECK (avatar IS NULL OR length(trim(avatar)) > 0),
    role             varchar(50),
    sort_order       integer NOT NULL DEFAULT 0,
    active           boolean NOT NULL DEFAULT true,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_staff_updated_at
    BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
