@echo off
echo ==============================================
echo Deploying Web OS Desktop to Vercel...
echo ==============================================
echo.

:: Check if Vercel CLI is installed
call npx vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found! Installing it globally...
    call npm install -g vercel
)

:: Run Vercel deployment with production flag
echo.
echo Starting Vercel Deployment...
echo Note: If this is your first time, it will ask you to log in to Vercel.
echo.
call npx vercel --prod

echo.
echo ==============================================
echo Deployment Finished!
echo Please remember to add your Supabase Environment Variables in your Vercel Dashboard!
echo ==============================================
pause
