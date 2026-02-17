@echo off
REM Online Enrollment System - Setup Script for Windows

echo.
echo ============================================================
echo   Online Enrollment System - Setup & Launch
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

echo [✓] Python is installed

REM Create virtual environment (optional but recommended)
if not exist venv (
    echo [→] Creating virtual environment...
    python -m venv venv
    echo [✓] Virtual environment created
)

REM Activate virtual environment
echo [→] Activating virtual environment...
call venv\Scripts\activate.bat
echo [✓] Virtual environment activated

REM Install dependencies
echo [→] Installing dependencies from requirements.txt...
pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    echo Please run: pip install -r requirements.txt
    pause
    exit /b 1
)
echo [✓] Dependencies installed

echo.
echo ============================================================
echo   Starting Server...
echo ============================================================
echo.
echo The server will start shortly. Open your browser to:
echo   → http://localhost:5000
echo.
echo To stop the server, press Ctrl+C
echo.
timeout /t 2 /nobreak

REM Start the Flask app
python app.py

pause
