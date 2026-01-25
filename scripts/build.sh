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

if [ -d "$in_directory/images" ]
then
  cp -r $in_directory/images $out_directory
fi

if [ $posts -eq 1 ]
then
  post_directories=$(ls $in_directory/posts)
  for post_directory in ${post_directories[@]}
  do
    ./scripts/build.sh $in_directory/posts/$post_directory $out_directory/$post_directory
  done
fi