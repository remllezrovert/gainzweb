const path = require("path");

module.exports = function override(config, env) {
  // Rule to handle HTML files as text/html
  config.module.rules.push({
    test: /\.html$/, // Match HTML files
    include: path.resolve(__dirname, "src"), // Ensure only files in the src directory are included
    use: [
      {
        loader: "html-loader", // Use html-loader to process HTML files
        options: {
          minimize: false, // Don't minimize HTML in development
        },
      },
    ],
  });

  // Rule to handle JavaScript files properly
  config.module.rules.push({
    test: /\.js$/, // Match JavaScript files
    include: [
      path.resolve(__dirname, "src"), // Include files from src directory
      path.resolve(__dirname, "src/Forms/Strength"), // Include specific folder for create.js
    ],
    use: {
      loader: "babel-loader", // Use Babel loader for JS files
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"], // Use Babel presets for modern JavaScript and React
      },
    },
  });

  return config;
};
