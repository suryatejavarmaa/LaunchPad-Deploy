# Create a checkmark checkpoint
$repoPath = "c:\Users\Asus\Downloads\rap\Website"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$message = "Checkmark: $timestamp"

Write-Host "Creating checkmark $message..." -ForegroundColor Yellow

git -C $repoPath add .
git -C $repoPath commit -m $message
git -C $repoPath tag -f checkmark-latest

Write-Host "Done! Checkmark created and 'checkmark-latest' tag updated." -ForegroundColor Green
