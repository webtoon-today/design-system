storybook build

INDEX=$(cat storybook-static/index.html)

echo $INDEX | sed 's/<\/head\>/\<script\>window.onload=function(){if(window.location.pathname === "\/"){return;}let session=localStorage.getItem(\"session\");if (!session || !JSON.parse(session)?.userid) { window.location.href = "\/"; return;}}\<\/script\>\<\/head\>/g' > storybook-static/temp.html
mv storybook-static/temp.html storybook-static/index.html