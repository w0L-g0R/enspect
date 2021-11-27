# Import config variables
. ./Configuration.ps1

Write-Host "Checking if $projectFolder exists"
# Write-Host "Checking if $PSScriptRoot exists"

if (Test-Path -Path $projectFolder) {
    "Path exists - removing existing projectFolder"
    Remove-Item $projectFolder -Recurse
} 
"Path doesn't exist. Creating new projectFolder"
New-Item -Path $PSScriptRoot -Name $appName -ItemType "directory"
