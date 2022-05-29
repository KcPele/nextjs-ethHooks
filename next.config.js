// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig


  
const withTM = require("next-transpile-modules")(["eth-hooks", "react-ipfs-uploader"]); // pass the modules you would like to see transpiled

module.exports = withTM();