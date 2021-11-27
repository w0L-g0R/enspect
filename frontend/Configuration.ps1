# ______________________________________________________________________ APPNAME
$appName = "src/enspect"

# _______________________________________________________________________ FOLDER

$projectFolder = Join-Path -Path $PSScriptRoot -ChildPath $appName
$configsFolder = Join-Path -Path $PSScriptRoot -ChildPath "configs"
$scriptsFolder = Join-Path -Path $PSScriptRoot -ChildPath "scripts"
$templatesFolder = Join-Path -Path $PSScriptRoot -ChildPath "templates"

$projectSrcFolder = Join-Path -Path $projectFolder -ChildPath "src"
$templateAppFolder = Join-Path -Path $templatesFolder -ChildPath "app"
$templateEnvFolder = Join-Path -Path $templatesFolder -ChildPath "environments"

# ________________________________________________________________________ FILES
$projectFolderESLintrc = Join-Path -Path $projectFolder -ChildPath ".eslintrc.json"

$configsFolderESLintrc = Join-Path -Path $configsFolder -ChildPath ".eslintrc.json"
$configsFolderPrettierrc = Join-Path -Path $configsFolder -ChildPath ".prettierrc"
$configsFolderPrettierIgnore = Join-Path -Path $configsFolder -ChildPath ".prettierignore"