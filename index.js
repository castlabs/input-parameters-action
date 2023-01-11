const core = require('@actions/core');
const github = require('@actions/github');

try {
  const payload = github.context.payload;
  if (github.context.eventName === 'workflow_dispatch' && payload.inputs) {
    for (const input in payload.inputs) {
      core.setOutput(input, payload.inputs[input]);
    }
  } else if (github.context.eventName === 'pull_request') {
    const prefix = core.getInput('line-prefix');
    const body = payload.pull_request.body;
    for (const line of (body || "").split('\n')) {
      if (line.startsWith(prefix)) {
        const inputsString = line.substring(prefix.length).trim();
        console.log("Found config: "+inputsString);
        const inputs = JSON.parse(inputsString);
        for (const input in inputs) {
          console.log("Setting parameter " + input + ":" + inputs[input]);
          core.setOutput(input, inputs[input]);
        }
      }
    }
  }
} catch (error) {
  core.setFailed(error)
}

