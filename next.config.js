const isProduction = process.env.NODE_ENV === 'production'
const name = 'nextjs-paper'

module.exports = {
  assetPrefix: isProduction ? `/${name}/` : '',
  basePath: isProduction ? `/${name}` : '',
  images: {
    loader: 'akamai',
    path: '',
  },
}
