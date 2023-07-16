/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rmutsv.ac.th",
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
