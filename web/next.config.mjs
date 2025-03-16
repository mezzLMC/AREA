/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "Access-Control-Allow-Methods, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Access-Control-Allow-Credentials" },
                ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/swagger.json',
                destination: '/api/swagger',
            },
            {
                source: "/about.json",
                destination: "/api/about",
            }
        ];
    },
    webpack: (config, { isServer }) => {
        const configCopy = { ...config};
        if (!isServer) {
            configCopy.resolve.alias['@sentry/node'] = '@sentry/browser';
            configCopy.resolve.fallback.fs = false;
        }
        configCopy.module.rules.push({
            test: /\.node$/,
            loader: 'node-loader',
        });
        return configCopy;
    },
};

export default nextConfig;
