#/bin/bash

function build_jq_template() {
  local stdin="$1"
  local template_raw="$2"
  IFS=$'\n'
  local queries=($(echo $template_raw | grep -o '{{ [^}]* }}' | sed 's@[{}]@@g'))

  local keep_going=1
  local count=0
  while [ $keep_going -eq 1 ]
  do
    template_raw=$(echo -e "$template_raw" | perl -p0e "s@{{ [^}0-9]* }}@{{ $count }}@")
    local templates=$(echo $template_raw | grep -o '{{ [^}0-9]* }}')
    if [ "$templates" == "" ]
    then
      keep_going=0
    fi
    count=$(($count + 1))
  done

  for (( k=0; k<${#queries[@]}; k++))
  do
    local variable_name="{{ $k }}"
    local variable_value=$(echo -e "$stdin" | jq "${queries[$k]}" -r)
    template_raw="${template_raw//$variable_name/$variable_value}"
  done
  echo -e "$template_raw"
}

stdin=""

while IFS= read -r line; do
  stdin="$(echo -e "$stdin\n$line")"
done

build_jq_template "${stdin:1}" "$@"