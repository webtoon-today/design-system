TARGET_PACKAGE="$1"

if [ -z "$TARGET_PACKAGE" ]; then
  echo "build all packages"
  
  PACKAGES=$(ls -d ./packages/*/*)

  for PACKAGE in $PACKAGES; do
    PACKAGE_NAME=$(node -e "
      let fs = require('fs');
      let fn = fs.readFileSync('${PACKAGE}/package.json','utf8');  
      console.log(JSON.parse(fn).name); 
    ")
    npm run build -w $PACKAGE_NAME
  done
  exit 0
fi

echo "build package: $TARGET_PACKAGE"
npm run build -w $TARGET_PACKAGE