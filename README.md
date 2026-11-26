# CLTeam_BuildingOperations

CLTeam Dev Academy Project.

## Pull request CI

GitHub Actions runs `PR CI` for pull requests targeting `preview` and `main`.
It builds and tests the CRA frontend with Node.js 24, restores and builds the
.NET 10 API with analyzers, builds and scans the API image, and scans Git
history for secrets. Dependency and image scans fail on High or Critical
findings. CI does not publish images or deploy anything.

Run the build and test checks locally:

```sh
(cd frontend && export CI=true && npm ci --no-audit && npm run build && npm test -- --watchAll=false)
dotnet restore backend/backend.csproj
dotnet build backend/backend.csproj --configuration Release --no-restore -p:RunAnalyzersDuringBuild=true
docker build --tag building-operations-api:ci backend
```

If GitHub secret scanning with push protection is unavailable, install
[Gitleaks](https://github.com/gitleaks/gitleaks#installing) and opt into the
repository's pre-commit hook from the repository root:

```sh
git config --local core.hooksPath .githooks
```

This replaces the hook directory for this clone; if you already use a custom
hook directory, add the Gitleaks hook to it instead.

### GitHub setup (repository admin)

1. Confirm the repository is private and grant the jury read access.
2. Require pull requests for `preview` and `main` so neither accepts direct
   pushes. Require approvals (one on `preview`; on `main`, one for a two-person
   team or two for a three- or four-person team) and resolved review
   conversations. Dismiss stale approvals and block force pushes and deletion.
3. After GitHub Actions has reported these checks, require all three on both
   branches: `Frontend build, test, and audit`, `API build, audit, and image
   scan`, and `Secret scan`. Resolve any existing blocking findings before
   relying on the checks for normal merges.

Open feature PRs against `preview` and squash-merge them. Promote `preview`
to `main` through a release PR using a merge commit. Leave linear history off
so hotfixes merged into `main` can be back-merged into `preview`.

The frontend image build, database migration validation, and backend
integration tests are not part of this baseline. Add them when the new
frontend and database scaffolds are in place.
