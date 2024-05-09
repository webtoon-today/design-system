if [ -d "./.github" ]; then
  echo "skip postinstall script"
  exit 0
fi  

if [ -d "./dist" ]; then  
  cp -r ./dist/* ./
  rm -rf ./dist
  echo "postinstall script executed successfully"
fi