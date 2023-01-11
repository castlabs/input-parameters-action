# Input Parameters Action

This action provides a uniform interface for job input parameters whether the
job has been triggerered from a `workflow_dispatch` event or from a 
`pull_request_review_comment`event. In the latter case, input parameters must
be provided JSON-formatted in the review comment body, after a configurable
prefix.

The parameters are exposed as outputs, together with `valid-trigger` true/false
string that will be true unless the job was triggered from a review comment that
does not start with the configured prefix.

## Inputs

| Name             | Description                                                                                                                                                       |
|------------------|----------------------------------------------------------------|
| `line-prefix` | A previx that will identify a comment as triggering a workflow |


## Outputs

| Name            | Description                   |
|-----------------|-------------------------------|
| `*`             | The other input parameters    |

## Example usage

```
on:
  workflow_dispatch:
     inputs:
      clean-workspace:
        description: 'Cleans the workspace before git checkout'
        type: boolean
        required: false
...
- uses: castlabs/input-parameters-action@v1.0
  id: parameters
  with:
    line-prefix: '/workflow'

- name: Clean workspace
  if: ${{ steps.parameters.outputs.clean-workspace == 'true' }}
  run: rm -rf *
