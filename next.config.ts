import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    // Fotos del "Signed by", que vienen del CRM. Si se cambia, actualizar también
    // AVATAR_URL_PREFIX en src/app/lib/staff.ts.
    remotePatterns: [
      { protocol: 'https', hostname: 'media.unkedition.com', pathname: '/avatars/**' },
    ],
  },
};

export default nextConfig;
