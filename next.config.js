/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ruts-slider.vercel.app",
                port: "",
                pathname: "/**",
            }
        ]
    }
   

}

module.exports = nextConfig
