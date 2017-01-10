#!/bin/sh

set -e

NAME="$1"

if [ -z $NAME ] || [ "$NAME" = "-h" ] || [ "$NAME" = "--help" ]; then
  echo
  echo "Makes a workshop directory with default files."
  echo
  echo "Usage:"
  echo "  ./mk <name> [<title>]"
  echo "  ./mk -h | --help"
  echo
  exit 1
fi

# done below [ -z $NAME ] to make sure the shift is safe
shift
TITLE="$*"

if [ -e $NAME ]; then
  echo "Error: workshop directory already exists."
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

echo "Ready."
tree --noreport "$NAME"

