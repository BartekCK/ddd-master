# Root of @ddd-master/* packages


## How to release new lib version
1. Create new branch from `master` with name `release/vX.X.X`
2. Update version in `package.json` and `package-lock.json` files by command
```bash
  npm run bump:patch:all
```
3. Commit changes with message `chore: bump version to vX.X.X`
4. Create PR from `release/vX.X.X` to `master` branch
5. Merge PR to `master` branch
6. Checkout into `master` branch and pull changes
7. Create new tag with name `vX.X.X` and push it to remote
```bash
  git tag vX.X.X
  git push origin vX.X.X
```
8. Create new release from tag `vX.X.X` in GitHub
