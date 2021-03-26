#!/usr/bin/env bash
set -e

if ! command -v git &> /dev/null
then
    echo "git command could not be found, please make sure git is properly installed"
    exit
fi

echo "Enter git username:"
read $GIT_USERNAME
git config --global user.name $GIT_USERNAME

echo "Enter git email:"
read $GIT_EMAIL
git config --global user.email $GIT_EMAIL

echo "Generating SSH public and private keys..."
ssh-keygen -t ed25519 -C "$GIT_EMAIL" -N "" -f $HOME/.ssh/id_ed25519

echo "Add this public SSH key data to https://github.com/settings/ssh/new :"
echo $HOME/.ssh/id_ed25519.pub

echo "Press any key to continue"
read

SSH_CONFIG_CONTENT="Host github.com
User git
Hostname github.com
PreferredAuthentications publickey
IdentityFile $HOME/.ssh/id_ed25519"
echo "$SSH_CONFIG_CONTENT" >> $HOME/.ssh/config

cat $HOME/.ssh/id_ed25519.pub >> $HOME/.ssh/authorized_keys
eval "$(ssh-agent -s)"
ssh-add -qv $HOME/.ssh/id_ed25519
chmod --recursive 700 $HOME/.ssh

echo "Testing ssh connection to git@github.com"
ssh -o StrictHostKeyChecking=no -vT git@github.com
