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
npm test
mkdir -p ./coverage
npm test --silent -- --reporter json > ./coverage/$1.json
npm run cov-test || true
npm run cov-lcov

}

#chartjs-plugin-crosshair" refer to chart.js 3.4
npm i --legacy-peer-deps 
cd build/module; npm i; cd -
npm run build
test "test-result"

ls -l ./coverage

tar -czvf ./build.tar.gz ./* || true
