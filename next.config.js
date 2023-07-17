/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ruts-slider-pr.vercel.app/",
                port: "",
                pathname: "/**",
            }
        ]
    },
    async rewrite() {
        return [
            {
                source: '/posts/:slug',
                destination: '/posts/[slug]',
            }
        ]
    }

}

module.exports = nextConfig
