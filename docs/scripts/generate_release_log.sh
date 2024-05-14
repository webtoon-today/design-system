current=$(git branch --show-current)

if [ $(cat public/RELEASE_LOG.md | grep "$current" | wc -l) -gt 0 ]; then
  echo "Already logging" > 2
  exit 1
fi

echo "### $(date)" >> public/RELEASE_LOG.md

echo "[$current](https://design-system.webtoon.today/$current)\n" >> public/RELEASE_LOG.md