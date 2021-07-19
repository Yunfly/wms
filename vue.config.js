module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://ec2-3-84-110-44.compute-1.amazonaws.com',
        changeOrigin: true
      }
    }
  }
}
