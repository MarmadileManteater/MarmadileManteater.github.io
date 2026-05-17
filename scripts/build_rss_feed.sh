#/bin/bash

if [ "$SITE_URL" == "" ]
then
  SITE_URL="https://marmadilemanteater.dev"
fi

function build_items() {
  local post_index=$(bash ./scripts/index_posts.sh)
  local item_template=$(cat ./src/templates/item.rss)
  local template_with_globals_baked=$(echo "$item_template" | sed "s@{{ SITE_URL }}@$SITE_URL@g")

  IFS=$'\n'
  local queries=($(echo $template_with_globals_baked | grep -o '{{ [^}]* }}' | sed 's@[{}]@@g'))

  local keep_going=1
  local count=0
  while [ $keep_going -eq 1 ]
  do
    template_with_globals_baked=$(echo -e "$template_with_globals_baked" | perl -p0e "s@{{ [^}0-9]* }}@{{ $count }}@")
    local templates=$(echo $template_with_globals_baked | grep -o '{{ [^}0-9]* }}')
    if [ "$templates" == "" ]
    then
      keep_going=0
    fi
    count=$(($count + 1))
  done

  local length=$(echo $post_index | jq '. | length')
  for (( i=0; i<$length; i++))
  do
    item_template=$(echo -e "$template_with_globals_baked")
    for (( k=0; k<${#queries[@]}; k++))
    do
      local variable_name="{{ $k }}"
      local variable_value=$(echo "$post_index" | jq ".[$i]" | jq "${queries[$k]}" -r)

      item_template="${item_template//$variable_name/$variable_value}"
    done
    echo -e "$item_template"
  done
}

function build_feed() {
  local last_update=$(bash ./scripts/index_posts.sh | jq .[0].publishedRss -r)
  local feed_template=$(cat ./src/templates/feed.rss)
  local items=$(./scripts/tab_each_line.sh "$(build_items)" 4)
  local template_with_globals_baked=$(echo -e "$feed_template" | sed "s@{{ SITE_URL }}@$SITE_URL@g" | sed "s@{{ UPDATE_DATE }}@$last_update@g" | perl -p0e "s@{{ ITEMS }}@$items@")
  
  echo -e "$template_with_globals_baked"
}

build_feed