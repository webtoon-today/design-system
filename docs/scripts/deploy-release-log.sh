cat public/RELEASE_LOG.md

aws s3 cp public/RELEASE_LOG.md s3://front-design-system.webtoon.today --acl public-read

aws cloudfront create-invalidation --distribution-id E2U4FV88FXPRPU --paths "/RELEASE_LOG.md" | cat
