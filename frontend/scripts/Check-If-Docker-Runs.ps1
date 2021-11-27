Write-Output "$((Get-Date).ToString("HH:mm:ss")) - Check if docker service runs"

$dockerDesktopService = Get-Service | Where-Object { $_.name -ilike "*docker*"}

if ($dockerDesktopService) {
    Write-Output "Docker Service Running", $dockerDesktopService
} else{
    & "$PSScriptRoot\Start-Docker-Service.ps1"
}
