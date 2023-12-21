// prepare-deployment.js
const { exec } = require('child_process');

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
};

const prepareDeployment = async () => {
  console.log('Preparing for deployment...');

  try {
    // Install dependencies
    console.log('Installing dependencies...');
    await runCommand('npm install');
    await runCommand('npm run build');


    // Perform any additional build steps if needed
    // For example, if you have a build script in your package.json
    // await runCommand('npm run build');

    console.log('Deployment preparation completed.');
  } catch (error) {
    console.error('Failed to prepare for deployment:', error);
    process.exit(1);
  }
};

prepareDeployment();
