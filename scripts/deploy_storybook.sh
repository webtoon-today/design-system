aws s3 sync s3://front-design-system.webtoon.today --acl public-read

# TODO: update cloudfront id
aws cloudfront create-invalidation --distribution-id ${cloudfront_id} --paths "/*" | cat