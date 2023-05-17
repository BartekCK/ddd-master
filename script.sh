npm run build:all
npm publish --access public

# Create new version for all packages in separate branch
npm run bump:patch:all
# Create PR from current branch to master
# Checkout into master, create and push tag
git tag v.1.0.0
# Create relase base on tag
