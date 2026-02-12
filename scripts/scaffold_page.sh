#!/bin/bash

function main() {
  local template="$(cat ./src/templates/post.html)"
  echo "What is the title?"
  read title
  template=$(echo -e "$template" | sed "s@{{ TITLE }}@$title@g")
  echo "What is the description?"
  read description
  template=$(echo -e "$template" | sed "s@{{ DESCRIPTION }}@$description@g")
  echo "What are the keywords?"
  read keywords 
  template=$(echo -e "$template" | sed "s@{{ KEYWORDS }}@$keywords@g")
  echo "What is the URL stub?"
  read stub

  mkdir ./src/posts/$stub
  echo -e "$template" > ./src/posts/$stub/index.html
  mkdir ./src/posts/$stub/styles
  touch ./src/posts/$stub/styles/vars.css
  touch ./src/posts/$stub/styles/main.css
}

main