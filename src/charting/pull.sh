dir=$(dirname "${BASH_SOURCE[0]}")
cd $dir
ls -l 
ls -l ./template
D="../../../XBRL/src/charting"
ls $D 
FULL="$(readlink -e $D)"

cp "$FULL/transform.js" ./
cp "$FULL/gauge*"  ./
cp "$FULL/template" ./ -r

cd -