#!/bin/bash
echo "frontend npm instal?:$INSTALL_F"
echo "frontend npm run build?:$BUILD_F"
echo "backend npm install?:$INSTALL_B"

if ["-z $BLOG_PORT"];then
    export BLOG_PORT=6600
fi
echo "port:$BLOG_PORT"

export BLOG_DIR=`pwd`
export FRONT_END_DIR=$BLOG_DIR/BlogApp
export BACK_END_DIR=$BLOG_DIR/BlogServer

echo "项目目录:$BLOG_DIR"
echo "前端:$FRONT_END_DIR"
echo "后端:$BACK_END_DIR"

cd $FRONT_END_DIR

if ["$INSTALL_F"="TRUE"]; then
    echo "frontend npm install..."
    npm install
fi

if ["$BUILD_F"="TRUE"]; then
    echo "frontend build..."
    npm run build
fi

echo "stop server"

export APP_PID=`lsof -i:$BLOG_PORT -t`

if ["! -z $APP_PID"]; then
    kill -9 $APP_PID
fi

echo "clean dist"
rm -rf $BACK_END_DIR/public/dist

cd $BACK_END_DIR

if ["$INSTALL_B"="TRUE"]; then
    echo "backend npm install..."
    npm install
fi

echo "start server..."
npm run prod

echo "bye"