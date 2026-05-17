#/bin/bash

function get_json() {
  local post_stub="$1"
  local file_uri="src/posts/$post_stub/index.html"
  local file_text="$(cat $file_uri)"

  local date_element=$(echo "$file_text" | grep -oP "<time datetime=\"[^\"]*\".*" )
  local date_value=$(echo $date_element | sed 's@<time datetime="@@g' | sed 's@".*@@g')
  local date_string=$(echo $date_element | sed 's@.*">@@g' | sed 's@<.*@@g')

  local date_formatted=$(date -d "$date_value" +"%e %B %Y" | xargs)

  local date_rfc2822="$(date -d"$date_value" -R)"

  local title=$(echo "$file_text" | grep -oP "<title>.*</title>" | sed 's@<title>@@g' | sed 's@</title>@@g')
 
  local description=$(echo "$file_text" | grep -ozP "name=\"description\"(.|\n)*?/>" | tr '\0' '\n' | grep "content=" | sed "s@.*=\"@@g" | sed "s@\"@@g")
  local keywords_raw=$(echo "$file_text" | grep -ozP "name=\"keywords\"(.|\n)*?/>" | tr '\0' '\n' | grep "content=" | sed "s@.*=\"@@g" | sed "s@\"@@g" | sed "s@ @@g")
  local keywords_lowercase="${keywords_raw,,}" 
  local keywords_raw2=$(echo $keywords_lowercase | sed -e $'s/,/\\\n/g' | sort -n | tr '\n' ',')
  local keywords=$(echo "${keywords_raw2::-1}" | sed 's@,@", "@g')

  echo "{"
  echo "  \"stub\": \"$post_stub\","
  echo "  \"title\": \"$title\","
  echo "  \"description\": \"$description\","
  echo "  \"keywords\": [\"$keywords\"],"
  echo "  \"published\": \"$date_value\","
  echo "  \"publishedFormatted\": \"$date_formatted\","
  echo "  \"publishedRss\": \"$date_rfc2822\","
  echo "  \"publishedString\": \"$date_string\""
  echo "}"
}

get_json "$@"
