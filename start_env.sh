#!/bin/bash

env_UID=6275
env_GID=6275

docker run -d \
    --name dev_theia \
    -p 3333:3000 \
    --user ${env_UID}:${env_GID} \
    -v "${PWD}:/home/project:cached"\
    -v "/root/.theia:/home/theia/.theia"\
    --rm \
    theiaide/theia:next

export STB_HTTP=8011

bash --rcfile env.bashrc

docker stop dev_theia
