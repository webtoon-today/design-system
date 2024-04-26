PACKAGE="$1"

if [ -z "$PACKAGE" ]; then
  echo "build all packages"
  node scripts/build.js
  exit 0
fi

echo "build package: config"
npm run build -w config

echo "build package: $PACKAGE"
npm run build -w $PACKAGE