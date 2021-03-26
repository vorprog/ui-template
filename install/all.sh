#!/usr/bin/env bash
set -ex

sudo apt-get install git

wget -qO - richardsnider.github.io/install/vscode.sh | bash

wget -qO - richardsnider.github.io/install/docker.sh | bash

wget -q0 - richardsnider.github.io/install/git-ssh.sh | bash

wget -qO - richardsnider.github.io/install/nodejs.sh | bash

wget -qO - richardsnider.github.io/install/aws-cli.sh | bash
