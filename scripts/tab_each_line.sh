#/bin/bash

function tab_each_line() {
  IFS=$'\n'
  local input=($1)
  local distance="$2"
  if [ "$distance" == "" ]
  then
    distance="2"
  fi

  for ((k=0;k<${#input[@]};k++))
  do
    if [ "$k" -gt 0 ]
    then
      for ((i=0;i<$distance;i++))
      do
        printf " "
      done
    fi
    printf "$(echo ${input[$k]} | sed 's/%/%%/g')\n"
  done
}

tab_each_line "$@"