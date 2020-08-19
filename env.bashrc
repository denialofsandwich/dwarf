#!/bin/bash

source /etc/bash.bashrc
source ~/.bashrc

PS1="[dwarf] $PS1"

alias dev='docker-compose up --build ; docker-compose down'
alias prod='docker-compose -f docker-compose.prod.yml up --build ; docker-compose -f docker-compose.prod.yml down'
