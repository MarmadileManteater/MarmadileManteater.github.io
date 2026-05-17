#/bin/bash

if [ "$SITE_URL" == "" ]
then
  SITE_URL="https://marmadilemanteater.dev"
fi

function build_items() {
  local post_index=$(bash ./scripts/index_posts.sh)
  local item_template=$(cat ./src/templates/item.rss)
  local template_with_globals_baked=$(echo "$item_template" | sed "s@{{ SITE_URL }}@$SITE_URL@g")

  local length=$(echo $post_index | jq '. | length')
  for (( i=0; i<$length; i++))
  do
    item_template=$(echo -e "$template_with_globals_baked")
    echo "$post_index" | jq ".[$i]" | bash ./scripts/build_jq_template.sh "$item_template"
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