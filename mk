#!/bin/sh

set -e

NAME=$1
TITLE=$2

if [ -z $NAME ]; then
  echo "makes a workshop:  ./mk <name> [<title>]"
  exit 1
fi

if [ -e $NAME ]; then
  echo "warning: file or directory already exists"
  exit 1
fi


mkdir "$NAME"

if [ -z "$TITLE" ]; then
  touch "$NAME/blurb.txt"
  touch "$NAME/README.md"
else
  echo "$TITLE" > "$NAME/blurb.txt"
  echo "# $TITLE" > "$NAME/README.md"
fi

echo "ready"

