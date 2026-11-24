YEPAS-DEMO - API MS
---
Description: API for Yepas Demo.
---

Node version: v24.16.0
Npm version: v11.13.0

## Clone repository and configure
I suggest use NVM to managment versions of node
First you need to configure ssh access for bitbucket

1. git clone https://github.com/jorgeluisbenavides/yepas-demo.git
2. git checkout develop (if defaul branch is not develop) Note: default branch for devs DEVELOP
3. git fetch origin develop && git pull origin develop
4. verify your node version is v24.16.0 width <<node --version>>
4. npm i or npm install (install dependencies)
5. Note: You need to create a new enviroment file *.env* and set the needed variables APP_ENV=local (IMPORTANT)
6. npm run test (run tests)
7. npx eslint . (check eslint constraints)
8. npm run dev (for working on local)

---

## Contribuite GIT FLOW 

To add a new fature follow next steps, from branch *develop* (be sure to principal branch is develop)
Note: <number> will be referenced to a ticket card of trello or jira.

1. git checkout -b feature/LOYALTY-DEMO-<number>-BE example. LOYALTY-DEMO-0001-BE - ticket associated by jira or trello
2. When finished. git checkout package-lock.json (don't commit this file)
3. git add .
4. git commit -m "LOYALTY-DEMO-<number>-BE - some new feature"
5. Do squash to have only one commit per pull request, git rebase -i HEAD~<number-of-commits-have-done>, use fixup or squash
6. git push origin feature/LOYALTY-DEMO-<number>-BE
7. Create new pull request

---

## Contact

Jorge Luis Benavides Amable
benavides_amable@hotmail.com

---
## Licence
MIT
---

# Constraints to integrate new feature
1. Include tests
2. Coverage >= 90%
3. Evindence of sonnar (attach screnshot in yours pull request's)
4. CURL of service
