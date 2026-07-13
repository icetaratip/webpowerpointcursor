@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ================================
echo  Cursor Presentation - Setup
echo ================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] ยังไม่พบ Node.js
  echo ติดตั้งจาก https://nodejs.org/ แล้วรันไฟล์นี้อีกครั้ง
  echo.
  pause
  exit /b 1
)

echo [1/2] ติดตั้งแพ็กเกจ... npm install
call npm install
if errorlevel 1 (
  echo.
  echo [ERROR] npm install ล้มเหลว
  pause
  exit /b 1
)

echo.
echo [2/2] เปิดเว็บ... npm run dev
echo เปิดเบราว์เซอร์ที่ http://localhost:5173/
echo กด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์
echo.
call npm run dev

pause
