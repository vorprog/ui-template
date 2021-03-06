#!/bin/bash

ROOT="."
HTTP="/"
OUTPUT="site-index.html" 

i=0
echo "<ul>" > $OUTPUT
for filepath in `find "$ROOT" -maxdepth 1 -mindepth 1 -not -path '*/\.*' | sort`; do
  path=`basename "$filepath"`
  echo "<li><a href=\"/$path\" target=\"_blank\">$file</a></li>" >> $OUTPUT
  echo "<ul>" >> $OUTPUT
  for i in `find "$filepath" -maxdepth 1 -mindepth 1 -type f| sort`; do
    file=`basename "$i"`
    echo "<li><a href=\"/$path/$file\" target=\"_blank\">$file</a></li>" >> $OUTPUT
  done
  echo "</ul>" >> $OUTPUT
done
echo "</ul>" >> $OUTPUT