/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rmutsv.ac.th",
                port: "",
                pathname:"/**",
            }
        ]
    }
}

module.exports = nextConfig
