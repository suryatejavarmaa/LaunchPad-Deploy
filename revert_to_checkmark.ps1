# Revert to the latest checkmark checkpoint
$repoPath = "c:\Users\Asus\Downloads\rap\Website"
Write-Host "Reverting to checkmark-latest checkpoint..." -ForegroundColor Yellow
git -C $repoPath checkout checkmark-latest -- .
Write-Host "Done! Project reverted to the checkmark checkpoint." -ForegroundColor Green
