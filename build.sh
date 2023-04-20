#!/bin/bash -xe

#printenv

if [ -z ${version+x} ]; then
    TAG=0.0.1
else
    TAG=$version
fi

if [ -z ${registry+x} ]; then
    REGISTRY=http://localhost:4873/
else
    REGISTRY=$registry
fi

LOGIN=$( echo $REGISTRY | sed s/http:// )

if [ -z ${BRANCH_NAME+x} ]; then
    BRANCH=master
else
    BRANCH=${BRANCH_NAME}
fi


function test()
{

export DEBUG=*:warning,*:error
mkdir -p ./coverage
npm test --silent --reporter json --reporter-option output=./coverage/$1.json || true
npm run cov-test || true
npm test || true
npm run cov-lcov

}

#chartjs-plugin-crosshair" refer to chart.js 3.4
npm i --legacy-peer-deps 
cd build/module; npm i; cd -
npm run build
mkdir -p ./test/unit/charts/tmp
test "test-result"

tar -czvf ./build.tar.gz ./* || true
