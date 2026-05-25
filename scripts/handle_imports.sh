#!/bin/bash

function handle_imports() {
  local input="$1"
  local in_directory="$2"
  IFS=$'\n'
  imports=($(echo -e "$1" | grep -o " *{{ *import[^}]*}}"))

  local output="$input"
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

    if [[ "$command_for_json" =~ ^~/ ]]
    then
      command_for_json="${command_for_json:2}"
    else
      command_for_json="$in_directory/$command_for_json"
    fi

    json=$(bash $command_for_json)

    if [ "$mode" == "object" ]
    then
      template_result=$(echo "$json" | bash ./scripts/build_jq_template.sh "$(cat $in_directory/$template_name)")
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

    template_result=$(bash ./scripts/tab_each_line.sh "${template_result:2}" $((${#spaces} - 4)))
    output="${output//${imports[$i]}/$template_result}"
  done

  echo -e "$output"
}

handle_imports "$@"