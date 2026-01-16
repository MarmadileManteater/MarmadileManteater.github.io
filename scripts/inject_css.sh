#!/bin/bash

input=$1
output=$2

if [ "$input" == "" ]
then
  input="$(pwd)/src/index.html"
fi
input_dir="$(dirname $input)"

if [ "$output" == "" ]
then
  output="$(pwd)/out/index.html"
fi

# make sure the out directory exists
dir=$(dirname $output)
if [ ! -d "$dir" ]
then
  mkdir "$dir"
fi

link=$(cat $input | grep -ozP '<link \n      rel="stylesheet"\n      href="([^"]*)"\n    />' | tr -d '\0')

hrefs=($(echo $link | grep -o "href=\"[^\"]*\""))

html=$(cat $input)

for href in ${hrefs[@]}
do
  stylesheet="${href:6:-1}"

  style_tag=$(echo -e "<style>\n$(cat $input_dir/$stylesheet)\n</style>" | sed 's/@/\\@/g')

  html=$(echo -e "$html" | perl -p0e "s^<link \n      rel=\"stylesheet\"\n      href=\"$stylesheet\"\n    />^$style_tag^g")
done

echo -e "$html" > $output