$nodeDir = "C:\Users\NoName\Downloads\node-v24.14.1-win-x64"
$env:PATH = "$nodeDir;$env:PATH"
Set-Location $PSScriptRoot
& "$nodeDir\npm.cmd" run dev
