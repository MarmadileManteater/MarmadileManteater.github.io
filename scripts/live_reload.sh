#!/bin/bash

does_req_exist=$(type inotifywait)
if [ "$does_req_exist" == "" ]
then
  echo "Install inotify-tools to use this script"
  exit
fi

# whether or not to host the files automatically
host=0

if [ "$(echo $@ | grep -o "\--host")" != "" ]
then
  host=1
fi

# whether or not to remove out files
clean=1

if [ "$(echo $@ | grep -o "\--no-clean")" != "" ]
then
  clean=0
fi

# Configuration
WATCH_DIR="./src"  # Directory to monitor (relative or absolute path)
BUILD_CMD="./scripts/build.sh"  # Your build command here

if [ $host -eq 1 ]
then
  tmux new-session -d -s "website-dev" "/bin/bash"
  tmux send-keys -twebsite-dev "npx http-server ./out" Enter
fi

cleanup() {
  if [ $host -eq 1 ]
  then
    # kill server when main process is killed
    tmux kill-session -twebsite-dev
  fi
  if [ $clean -eq 1 ]
  then
    # clean output directory
    rm ./out -r
  fi
}

trap cleanup SIGINT

# Monitor for file changes and trigger build
echo "Watching for changes in: $WATCH_DIR"
echo "Build command: $BUILD_CMD"
echo "Press Ctrl+C to stop..."

$BUILD_CMD

while inotifywait -q -r -e modify,create,delete,move "$WATCH_DIR"; do
  echo "--- Changes detected! Running build... ---"
  $BUILD_CMD
  echo "--- Build completed at $(date) ---"
done