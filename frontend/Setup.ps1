
# Import config variables
. ./Configuration.ps1
$startTime = Get-Date

"`n______________________________________________Starting Angular-Project-Setup"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START: $startTime`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> App name: $appName `n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Installing app`n"
ng new $appName --routing true --style sass --skip-git false
Set-Location $projectFolder  

"____________________________________________________________________ TEMPLATES`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Copy angular app folder template`n"

Copy-Item $templateAppFolder -Destination $projectSrcFolder -Recurse -Force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Copy angular environments folder template`n"

Copy-Item $templateEnvFolder -Destination $projectSrcFolder -Recurse -Force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Copy from ESLintrc to app folder`n"

Copy-Item $configsFolderESLintrc -Destination $projectFolder

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Copy from Prettierrc to app folder`n"

Copy-Item $configsFolderPrettierrc -Destination $projectFolder

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Copy from PrettierIgnore to app folder`n"

Copy-Item $configsFolderPrettierIgnore -Destination $projectFolder

"______________________________________________________________________ SCRIPTS`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding lint script to check`n"

npx npm-add-script -k "lint:check" -v "eslint . --ext js,ts,json" --force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding lint script to check`n"

npx npm-add-script -k "lint:fix" -v "eslint . --ext js,ts,json --quiet --fix" --force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Prettier script to check`n"

npx npm-add-script -k "prettier:check" -v "prettier --config .prettierrc --check 'src/**/*.{ts,css,html}'" --force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Prettier script to fix`n"

npx npm-add-script -k "prettier:fix" -v "prettier --config .prettierrc --write 'src/**/*.{ts,css,html}'" --force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Prettier script to fix`n"

npx npm-add-script -k "pre-commit" -v "npm run lint:fix && pretty-quick --staged && npm run test" --force

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding build production script`n"

npx npm-add-script -k "build:prod" -v "ng build --prod" --force

"_______________________________________________________________ DEPENDENCIES`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding ESLint`n"

ng add @angular-eslint/schematics

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Prettier + ESLint-Config`n"

npm install prettier --save-dev

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Pretty-Quick`n"

npm install pretty-quick --save-dev

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding ESLint-Config`n"

npm install eslint-config-prettier eslint-plugin-prettier --save-dev

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Husky`n"

npm install husky --save-dev
npx husky-init
npm run prepare

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Add Husky pre-commit hook`n"

npx husky set .husky/pre-commit "pre-commit"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Add pre-push hook`n"

npx husky add .husky/pre-push "build"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding Angular Material`n"

ng add @angular/material

"_______________________________________________________ CHECK DOCKER SERVICE`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Start Docker Service`n"

& "$PSScriptRoot\scripts\Check-If-Docker-Runs.ps1"

"_______________________________________________________ CHECK DOCKER SERVICE`n"

">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Start Docker Service`n"

& "$PSScriptRoot\scripts\Check-If-Docker-Runs.ps1"

"______________________________________________________________ TODO MANUALLY`n"

"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Add to github"

"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Start .devcontainer`n"

WRITE HOST "Setup time: "NEW-TIMESPAN –Start $startDate –End Get-Date
