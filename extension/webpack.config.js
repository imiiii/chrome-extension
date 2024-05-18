const path = require('path');

module.exports = {
  mode: 'development', // Change to 'production' when ready to deploy
  entry: {
    'background': './src/background.ts',
    'popup/popup': './src/popup/popup.ts',
    'content-scripts/content': './src/content-scripts/content.ts', // Adjusted entry
    'main':'./src/main.ts',
    'utils/auth':'./src/utils/auth.ts',
    'api/user_session':'./src/api/user_session.ts',
    'models/user_session_VM':'./src/models/user_session_VM.ts',
    'popup/success':'./src/popup/success.ts',
    'utils/apiHelper':'./src/utils/apiHelper.ts',
    'utils/base':'./src/utils/base.ts',
    'utils/enum':'./src/utils/enum.ts',
    'utils/responseHandler':'./src/utils/responseHandler.ts',
    'api/page_view':'./src/api/page_view.ts',
    'models/page_view_VM':'./src/models/page_view_VM.ts',
    'models/event_VM':'./src/models/event_VM.ts',
    'api/event':'./src/api/event.ts',
    'utils/urlParser':'./src/utils/urlParser.ts'
  // Adjusted path
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};