import config from './config';

export default new ModuleFederationPlugin({
  name: config.MFE_NAME,
  filename: 'remoteEntry.js',
  library: { type: 'var', name: config.MFE_NAME },
  exposes: {
    './App': './src/pages/Main.tsx',
    // Main will be exported instead of the App.tsx so that we can separate the store
    // and things that should be stored in the shell.
    './newReact': require.resolve('react'),
    './newReactDOM': require.resolve('react-dom'),
  },
  shared: [
    'react-dom',
    {
      react: {
        import: 'react', // the "react" package will be used a provided and fallback module
        shareKey: 'newReact', // under this name the shared module will be placed in the share scope
        shareScope: 'default', // share scope with this name will be used
        singleton: true, // only a single version of the shared module is allowed
      },
    },
  ],
});
