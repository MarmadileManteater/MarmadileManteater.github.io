#!/bin/bash

file_name=$1

if [ "$file_name" == "" ]
then
  file_name="output.html"
fi

link=$(cat index.html | grep -ozP '<link \n      rel="stylesheet"\n      href="(.*)"\n    />')
href=$(echo $link | grep -o "href=\".*\"")
stylesheet="${href:6:-1}"

style_tag=$(echo -e "<style>\n$(cat $stylesheet)\n</style>" | sed 's/@/\\@/g')

cat index.html | perl -p0e "s^<link \n      rel=\"stylesheet\"\n      href=\".*\"\n    />^$style_tag^g" > $file_name