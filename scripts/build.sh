#/bin/bash

in_directory="$1"

if [ "$in_directory" == "" ] || [ "$in_directory" == "--posts" ]
then
  in_directory="$(pwd)/src"
fi

out_directory="$2"

if [ "$out_directory" == "" ] || [ "$out_directory" == "--posts" ]
then
  out_directory="$(pwd)/out"
fi

# whether or not to build post files
posts=0

if [ "$(echo $@ | grep -o "\--posts")" != "" ]
then
  posts=1
fi

bash ./scripts/inject_css.sh $in_directory/index.html $out_directory/index.html

sed -i "s@{{ SITE_URL }}@$SITE_URL@g" $out_directory/index.html

sed -i "s@</head>@  <link type=\"application/atom+xml\" rel=\"alternate\" href=\"$SITE_URL/rss.xml\" title=\"a collection of dumb little articles i wrote for my stupid little website\" />\n  </head>@g" $out_directory/index.html

IFS=$'\n'
imports=($(cat $out_directory/index.html | grep -o " *{{ *import[^}]*}}"))

for ((i=0;i<${#imports[@]};i++))
do
  spaces=$(echo "${imports[$i]}" | grep -o " " | tr -d '\n')
  import=${imports[$i]}
  import=${import//$spaces/""}
  import_statement=$(echo ${import:2:-2})
  IFS=$'\n'
  arguments=($(echo $import_statement | grep -o "'[^']*'"))
  template_name=${arguments[0]:1:-1}
  command_for_json=${arguments[1]:1:-1}
  mode="object"
  if [ ${#arguments[@]} > 2 ]
  then
    mode=${arguments[2]:1:-1}
  fi

  json=$(bash $command_for_json)

  if [ "$mode" == "object" ]
  then
    template_result=$($command_for_json | bash ./scripts/build_jq_template.sh "$(cat $in_directory/$template_name)")
  fi

  if [ "$mode" == "list" ]
  then
    length=$(echo $json | jq '. | length')
    template_result=""
    for((k=0;k<$length;k++))
    do
      entry=$(echo $json | jq ".[$k]")
      template_result="$template_result\n${spaces:0:-4}$(echo "$entry" | bash ./scripts/build_jq_template.sh "$(cat $in_directory/$template_name)")"
    done
  fi

  output=$(cat $out_directory/index.html)
  template_result=$(bash ./scripts/tab_each_line.sh "${template_result:2}" $((${#spaces} - 4)))
  echo -e "${output//${imports[$i]}/$template_result}" > $out_directory/index.html
done

if [ -d "$in_directory/images" ]
then
  cp -r $in_directory/images $out_directory
fi

if [ $posts -eq 1 ]
then
  post_directories=$(ls $in_directory/posts)
  for post_directory in ${post_directories[@]}
  do
    if [ -d "$in_directory/posts/$post_directory" ]
    then
      bash ./scripts/build.sh $in_directory/posts/$post_directory $out_directory/$post_directory
    fi
  done
  bash ./scripts/build_rss_feed.sh > $out_directory/rss.xml
fi