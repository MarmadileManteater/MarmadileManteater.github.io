#/bin/bash

in_directory="$1"

if [ "$in_directory" == "" ]
then
  in_directory="$(pwd)/src"
fi

out_directory="$2"

if [ "$out_directory" == "" ]
then
  out_directory="$(pwd)/out"
fi

./scripts/inject_css.sh $in_directory/index.html $out_directory/index.html

cp -r $in_directory/images $out_directory