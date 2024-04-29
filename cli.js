#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import {
  createPackageJson,
  installDependencies,
  installRedux,
  createWebpackConfig,
} from "./common-commands";

const TEMPLATE_DIR = path.resolve(__dirname, "./boilerplate");

async function createProject({ projectName, useRedux, mfeType }) {
  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`A folder named ${projectName} already exists.`);
    return;
  }

  console.log(`Creating a new project in ${targetDir}`);
  await fs.copy(TEMPLATE_DIR, targetDir);

  // Create the package.json file
  await createPackageJson(projectName);

  await installDependencies(targetDir);

  if (useRedux) {
    await installRedux(targetDir);
  }

  await createWebpackConfig(mfeType, path.join(targetDir, "/webpack/config"));

  console.log("Project created successfully!");
  console.log(`Navigate into the project directory and run npm install`);
}

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "my-new-project",
    },
    {
      type: "list",
      name: "mfeType",
      message:
        "If you are using Module Federation, is this a shell or a child?",
      default: 0,
      choices: ["Shell", "Child", "Not an MFE App"],
    },
    {
      type: "input",
      name: "mfePort",
      message: "Which port would you like your app to run on?",
      default: "3000",
    },
    {
      type: "confirm",
      name: "useRedux",
      message: "Do you need redux for your project?",
    },
  ]);

  await createProject(answers);
}

main();
