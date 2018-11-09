exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./backbase/*.spec.js'],
  baseUrl: 'http://computer-database.herokuapp.com/computers',
  params: {
    visualTest: {
      use: 'on',
      takeScreen: 'off',
      prefix: 'local'
    }
  },


onPrepare: function() {
        var PixDiff = require('pix-diff');
        browser.pixdiff = new PixDiff(
            {
                basePath: './screenshots/',
                width: 1280,
                height: 1024
            }
        );
    }
}
