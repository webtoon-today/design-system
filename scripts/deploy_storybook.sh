GIT_BRANCH="$1"

aws s3 sync storybook-static s3://front-design-system.webtoon.today/${GIT_BRANCH} --acl public-read

aws cloudfront create-invalidation --distribution-id E2U4FV88FXPRPU --paths "/${GIT_BRANCH}/*" | cat