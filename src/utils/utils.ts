export const pullRequestWorkflow = (): string => {
    return `Name: Frogbot pull request scan"
on:
  pull_request_target:
    types: [opened, synchronize]
permissions:
  pull-requests: write
  contents: read
jobs:
  scan-pull-request:
    runs-on: ubuntu-latest
    environment: frogbot
    steps:
      - uses: jfrog/frogbot@v2
        env:
          JF_URL: \${{ secrets.JF_URL }}
          JF_ACCESS_TOKEN: \${{ secrets.JF_TOKEN }}
          JF_GIT_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
}

export const scanRepositoryWorkflow = (defaultBranch: string): string => {
    return `name: "Frogbot Scan Repository"
on:
  push:
  workflow_dispatch:
  repository_dispatch:
    types:
      - trigger-frogbot-scan
  schedule:
    - cron: "0 0 * * *"

permissions:
  contents: write
  pull-requests: write
  security-events: write

jobs:
  scan-repository:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        branch: [ "${defaultBranch}" ]
    steps:
      - uses: jfrog/frogbot@v2
        env:
          JF_URL: \${{ secrets.JF_URL }}
          JF_ACCESS_TOKEN: \${{ secrets.JF_TOKEN }}
          JF_GIT_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          JF_GIT_BASE_BRANCH: \${{ matrix.branch }}`;
}
