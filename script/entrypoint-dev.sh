cd /app
echo "Prepare dev setup"
node ./dev_tools/entrypoint-dev.js -c ./openimis-dev.json -p /frontend-packages
echo "Updating package.json"
node ./modules-config.js openimis-dev.json
echo "Install application"
npm install
echo "Application has been updated!, will start now"
npm start  openimis-dev.json