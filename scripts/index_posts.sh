#/bin/bash

function index_posts() {
  local temp_directory="$(pwd)/temp"

  mkdir -p "$temp_directory"

  for dir in src/posts/*/
  do
    local stub=$(echo $dir | sed 's@src/posts/@@g' | sed 's@/@@g')
    local info_json=$(bash ./scripts/get_post_info.sh $stub)
    local published=$(echo $info_json | jq -r '.published')
    echo "$info_json" >> "$temp_directory/$published.json"
  done

  local posts_json="]"
  for file_uri in $temp_directory/*.json
  do
    local post_metadata=$(cat "$file_uri")
    posts_json=", $post_metadata$posts_json"
  done
  echo "[${posts_json:2}"
  rm $temp_directory -r
}

index_posts "$@"