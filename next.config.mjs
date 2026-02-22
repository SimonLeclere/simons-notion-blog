/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/blog',
                permanent: true,
            }
        ]
    },
};
export default nextConfig;


