const nextConfig = {
    reactStrictMode: true,
    // Add your desired modifications below
    distDir: '.next',
    images: {
      loader: 'imgix',
      path: '',
    },
  };
  
  module.exports = nextConfig;
  

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     output: 'export',
//     distDir: '_static',
//     images: {
//         unoptimized:true
//     },
    

// }

// module.exports = nextConfig
