module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.isHeaded) {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
    }
    return launchOptions;
  });
};
