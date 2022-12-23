dir=$(dirname "${BASH_SOURCE[0]}")
cd $dir
ls -l 
ls -l ./template
D="../../../XBRL/src/charting"
ls $D 
FULL="$(readlink -e $D)"

echo "$FULL"

cp ./transform.js "$FULL" 
#cp ./template "$FULL" ./ -r

cd -