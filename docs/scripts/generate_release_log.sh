current=$1

if [ -z "$current" ]; then
  current=$(git branch --show-current)
fi

echo "current branch: $current"

if [ $(cat public/RELEASE_LOG.md | grep "$current" | wc -l) -gt 0 ]; then
  echo "skip"
  exit 0
fi

echo "### $(date)" >> public/RELEASE_LOG.md

echo "[$current](https://design-system.webtoon.today/$current)\n" >> public/RELEASE_LOG.md

npm run build