const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');

export async function createPackageJson(projectName) {
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "",
    main: "index.ts",
    scripts: {
      serve: "webpack-dev-server --config webpack/webpack.dev.js",
      hot: "webpack-dev-server --config webpack/webpack.standalone.js",
      build: "webpack --config webpack/webpack.prod.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
  };

  await fs.writeJson(
    path.join(path.resolve(process.cwd(), projectName), "package.json"),
    packageJson,
    { spaces: 2 }
  );
}

export async function installDependencies(projectPath) {
  const dependencies = [
    "react",
    "react-dom",
    "lodash",
  ];
  const devDependencies = [
    "typescript",
    "webpack",
    "webpack-cli",
    "babel-loader",
    "@babel/core",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "@types/lodash",
    "@types/react",
    "@types/react-dom",
  ];

  // Running 'npm install' for dependencies
  console.log("Installing dependencies...");
  await runNpmInstall(projectPath, dependencies, false);

  // Running 'npm install' for devDependencies
  console.log("Installing devDependencies...");
  await runNpmInstall(projectPath, devDependencies, true);
}

export async function installRedux(projectPath) {
  const dependencies = ["redux", "react-redux", "redux-observable", "rxjs"];

  const devDependencies = ["@types/react-redux"];

  // Running 'npm install' for dependencies
  console.log("Installing dependencies...");
  await runNpmInstall(projectPath, dependencies, false);

  // Running 'npm install' for devDependencies
  console.log("Installing devDependencies...");
  await runNpmInstall(projectPath, devDependencies, true);
}

export function runNpmInstall(projectPath, packages, isDev) {
  const npmArgs = ["install", "--save", ...packages];
  if (isDev) {
    npmArgs.push("--save-dev");
  }

  return new Promise((resolve, reject) => {
    const installer = spawn("npm", npmArgs, {
      env: process.env,
      cwd: projectPath,
      stdio: "inherit",
    });

    installer.on("close", (code) => {
      if (code !== 0) {
        reject(`Installation failed with code: ${code}`);
        return;
      }
      resolve();
    });
  });
}

export async function createWebpackConfig(mfeType, path) {
  const content = `
        export default {
            MFE_TYPE: ${mfeType},
            MFE_PORT: ${mfePort},
            MFE_NAME: ${mfeName},
        }
    `;
  return new Promise((resolve) => {
    fs.writeFile(path, content, {}, resolve);
  });
}
