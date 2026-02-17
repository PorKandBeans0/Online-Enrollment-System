#!/usr/bin/env powershell

# Online Enrollment System - Setup Script for PowerShell

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   Online Enrollment System - Setup & Launch" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "[✓] Python is installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[✗] ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org" -ForegroundColor Yellow
    Write-Host "Make sure to check 'Add Python to PATH' during installation" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    return
}

# Create virtual environment if it doesn't exist
if (-not (Test-Path "venv")) {
    Write-Host "[→] Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    Write-Host "[✓] Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "[→] Activating virtual environment..." -ForegroundColor Cyan
& ".\venv\Scripts\Activate.ps1"
Write-Host "[✓] Virtual environment activated" -ForegroundColor Green

# Install dependencies
Write-Host "[→] Installing dependencies from requirements.txt..." -ForegroundColor Cyan
pip install -q -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "[✗] ERROR: Failed to install dependencies" -ForegroundColor Red
    Write-Host "Please run: pip install -r requirements.txt" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    return
}
Write-Host "[✓] Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   Starting Server..." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The server will start shortly. Open your browser to:" -ForegroundColor White
Write-Host "   → http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop the server, press Ctrl+C" -ForegroundColor White
Write-Host ""

Start-Sleep -Seconds 2

# Start the Flask app
python app.py
