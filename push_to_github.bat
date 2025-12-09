@echo off
echo ========================================================
echo   MarketHub GitHub Setup Assistant
echo ========================================================
echo.
echo 1. Please go to https://github.com/new and create a new repository named "MarketHub".
echo    (Do not initialize with README, .gitignore, or License)
echo.
pause
echo.

set /p username="2. Enter your GitHub username: "

echo.
echo Configuring remote 'origin' for https://github.com/%username%/MarketHub.git...
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/MarketHub.git
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. Please check your internet connection or if you are logged in to Git.
) else (
    echo.
    echo [SUCCESS] Project successfully pushed to MarketHub!
)
pause
