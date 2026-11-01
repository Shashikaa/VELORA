/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // The entire showcase can be hosted on any static host. No server required.
  output: "export",
  trailingSlash: true,
};
export default nextConfig;
