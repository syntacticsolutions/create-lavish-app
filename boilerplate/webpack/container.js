import config from './config';

export default new ModuleFederationPlugin({
    name: config.MFE_NAME,
    filename: 'remoteEntry.js',
    // uncomment this if you want to add a micro-app
    // remotes: {
    //   MicroApp: `microApp@${config.MICRO_APP_HOST}`,
    // },
    shared: {
      react: deps.react,
      'react-dom': {
        import: 'react-dom',
        shareKey: 'react-dom',
        shareScope: 'legacy',
        singleton: true,
      },
    },
  })