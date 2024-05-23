aws s3 sync docs/build s3://front-design-system.webtoon.today --acl public-read

aws cloudfront create-invalidation --distribution-id E2U4FV88FXPRPU --paths "/*" | cat