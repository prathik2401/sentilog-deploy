/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    }
    esline: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
