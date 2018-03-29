#!/bin/bash
echo "frontend npm instal?:$INSTALL_F"
echo "frontend npm run build?:$BUILD_F"
echo "backend npm install?:$INSTALL_B"

if [ ! $PORT ];then
    export PORT=6600
fi
echo "port:$PORT"

export BLOG_DIR=`pwd`
export FRONT_END_DIR=$BLOG_DIR/BlogApp
export BACK_END_DIR=$BLOG_DIR/BlogServer

echo "项目目录:$BLOG_DIR"
echo "前端:$FRONT_END_DIR"
echo "后端:$BACK_END_DIR"

cd $FRONT_END_DIR

if [ "$INSTALL_F" = "TRUE" ]; then
    echo "frontend npm install..."
    npm install
fi

echo "stop server"

export APP_PID=`lsof -i:$PORT -t`
echo "old app pid:$APP_PID"

if [ ! -z "$APP_PID" ]; then
    `kill -9 $APP_PID`
    echo "clean old dist"
    `rm -rf $BACK_END_DIR/public/dist`
fi

if [ "$BUILD_F" = "TRUE" ]; then
    echo "frontend build..."
    npm run build
fi

cd $BACK_END_DIR

if [ "$INSTALL_B" = "TRUE" ]; then
    echo "backend npm install..."
    npm install
fi

echo "start server..."
BUILD_ID=dontKillMe nohup npm run prod &

echo "bye"