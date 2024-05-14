aws s3 sync docs/public/RELEASE_LOG.md s3://front-design-system.webtoon.today --acl public-read

aws cloudfront create-invalidation --distribution-id E2U4FV88FXPRPU --paths "/*" | cat