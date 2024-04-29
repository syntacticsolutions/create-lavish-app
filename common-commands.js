import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(path.resolve(process.cwd(), projectName), "package.json"),
      JSON.stringify(packageJson, null, 2),
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export async function installDependencies(projectPath) {
  const dependencies = [
    "react",
    "react-dom",
    "lodash",
    "mini-css-extract-plugin",
    "webpack",
    "webpack-cli",
    "babel-loader",
    "@babel/core",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "typescript",
  ];
  const devDependencies = [
    "webpack-dev-server",
    "@types/lodash",
    "@types/react",
    "@types/react-dom",
    "clean-webpack-plugin",
    "html-webpack-plugin",
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

  // TODO Add the store
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

export async function createWebpackConfig(mfeType, mfePort, mfeName, path) {
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
