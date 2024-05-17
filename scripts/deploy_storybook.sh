CURRENT_BRANCH=$(git branch --show-current)

if [ -z "$CURRENT_BRANCH" ]; then
    echo "current branch is not found"
    exit 1
fi

aws s3 sync storybook-static s3://front-design-system.webtoon.today/${CURRENT_BRANCH} --acl public-read

aws cloudfront create-invalidation --distribution-id E2U4FV88FXPRPU --paths "/${CURRENT_BRANCH}/*" | cat