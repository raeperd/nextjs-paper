const isProduction = process.env.NODE_ENV === 'production'
const name = 'nextjs-paper'

module.exports = {
  assetPrefix: isProduction ? `/${name}/` : '',
  basePath: isProduction ? `/${name}` : '',
  images: {
    loader: 'akamai',
    path: '',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
