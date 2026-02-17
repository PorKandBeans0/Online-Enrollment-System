# Installation & Setup Guide - Windows

## Complete Step-by-Step Guide for Windows Users

### ✅ Prerequisites

Before you begin, you need:
- **Windows 10/11** (or latest Windows Server)
- **Python 3.8 or higher** (NOT installed? Download from [python.org](https://www.python.org))
- Internet connection
- Text editor or IDE (VS Code, PyCharm, etc.)

### 📍 Step 1: Verify Python Installation

**Option A: PowerShell**
```powershell
python --version
pip --version
```

**Option B: Command Prompt**
```cmd
python --version
pip --version
```

If you get version numbers (e.g., `Python 3.11.4`), Python is properly installed. If not, [install Python](https://www.python.org/downloads/).

### 🚀 Step 2: Quick Start (Recommended)

The easiest way is to use the provided startup script:

**Double-click one of these files in the `enrollment_system` folder:**

1. **`run.bat`** (For Command Prompt)
   - Simple double-click to run
   - Works with Command Prompt

2. **`run.ps1`** (For PowerShell)
   - Recommended for Windows 10/11
   - Better output formatting
   - May require execution policy change (see below)

#### If `run.ps1` doesn't work:

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try running `run.ps1` again.

### 🔧 Step 3: Manual Setup (Alternative)

If the scripts don't work, follow these steps:

#### 3.1 Open Command Prompt or PowerShell

Press `Win + R`, type `cmd` or `powershell`, press Enter.

#### 3.2 Navigate to Project Directory

```cmd
cd "C:\Users\Dave Angelo Aman\Documents\Schoolweeb\enrollment_system"
```

#### 3.3 Create Virtual Environment (Recommended)

```cmd
python -m venv venv
```

#### 3.4 Activate Virtual Environment

**Command Prompt:**
```cmd
venv\Scripts\activate.bat
```

**PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

You should see `(venv)` at the start of your prompt.

#### 3.5 Install Dependencies

```cmd
pip install -r requirements.txt
```

You should see:
```
Successfully installed Flask-2.3.3 Werkzeug-2.3.7
```

#### 3.6 Run the Application

```cmd
python app.py
```

You should see:
```
============================================================
🚀 Online Enrollment System Backend Started
============================================================
📍 Server running at: http://localhost:5000
📂 Database location: C:\Users\...\enrollment_system\database.db
============================================================
```

### 🌐 Step 4: Access the System

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Go to: **http://localhost:5000**
3. The enrollment form should load immediately

### 📝 Step 5: Test a Submission

1. Fill out the form completely:
   - Select a student type (New/Old/Transferee)
   - Fill personal information
   - Select a course
   - Click "Submit Enrollment"

2. You should see a success page with a Student ID

3. Stop the server (Ctrl+C in the terminal)

4. Check the database:
   ```cmd
   sqlite3 database.db
   ```
   
   Then run:
   ```sql
   SELECT COUNT(*) FROM students;
   ```

   You should see `1` (your submission)

### 🛑 Stopping the Server

To stop the server at any time, press **Ctrl+C** in the terminal.

### 🔄 Running Again

To run the server again, simply:

**Method 1 (Easiest):**
- Double-click `run.bat` or `run.ps1`

**Method 2 (From Terminal):**
- Navigate to the folder
- Run: `python app.py`

**Note:** Virtual environment will automatically activate

### ❌ Troubleshooting

#### Problem 1: "Python is not recognized"
```
'python' is not recognized as an internal or external command...
```

**Solution:**
- Python is not installed or not in PATH
- Download Python from [python.org](https://www.python.org)
- **IMPORTANT:** Check the box "Add Python to PATH" during installation
- Restart your computer after installing Python

#### Problem 2: Port 5000 Already in Use
```
Address already in use
```

**Solution A:** Stop other services using port 5000
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Solution B:** Change port in `app.py`
```python
# Change this line at the bottom:
app.run(debug=True, host='localhost', port=5001)  # Use 5001 instead
```

Then access: **http://localhost:5001**

#### Problem 3: Permission Denied When Running Script
```
File "run.ps1" cannot be loaded. The file run.ps1 is not digitally signed.
```

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Problem 4: Module Not Found
```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**
```cmd
# Make sure virtual environment is activated (you should see (venv) in prompt)
pip install flask werkzeug
```

#### Problem 5: Database Errors
```
database is locked or OperationalError
```

**Solution:**
- Stop the Flask server
- Delete `database.db`
- Run `app.py` again

### 📊 Project Files Overview

```
enrollment_system/
├── app.py                    # Main Flask application (165 lines)
├── database.db              # SQLite database (auto-created)
├── requirements.txt         # Python dependencies
├── run.bat                  # Quick-start script (Windows)
├── run.ps1                  # PowerShell startup script
├── .gitignore              # Git ignore rules
├── README.md               # Full documentation
├── INSTALLATION.md         # This file
├── templates/
│   ├── index.html          # Main enrollment form
│   ├── success.html        # Success confirmation page
│   └── error.html          # Error page
└── static/
    ├── style.css           # Modern glassmorphism styling (733 lines)
    └── script.js           # Form validation & interactivity (234 lines)
```

### 🔐 Security Notes

✅ **This system includes:**
- Parameterized SQL queries (no SQL injection possible)
- Client-side form validation
- Server-side error handling
- HTTPS ready for production

⚠️ **For Production:**
- Change `debug=False` in `app.py`
- Use HTTPS with SSL certificate
- Set up proper database backups
- Configure firewall rules
- Use environment variables for sensitive data

### 📧 Integration Tips

The form automatically posts to `/submit`. To integrate with additional services:

**Option 1: Email Notifications**
```python
# In app.py, add:
from flask_mail import Mail, Message
```

**Option 2: Payment Gateway**
```python
# In templates/success.html, add:
<script src="payment-gateway-api"></script>
```

**Option 3: Admin Dashboard**
- Read from `database.db` to create student reports
- Use SQLite browser tools for viewing data

### 🎓 Learning Resources

- **Flask Documentation:** https://flask.palletsprojects.com
- **SQLite Documentation:** https://www.sqlite.org/docs.html
- **HTML/CSS/JS:** https://www.w3schools.com

### ✨ Final Checklist

- [ ] Python 3.8+ installed
- [ ] Navigated to `enrollment_system` folder
- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Server running (`python app.py`)
- [ ] Browser shows form at `http://localhost:5000`
- [ ] Test form submission successful
- [ ] Student ID appears on success page

### 🎉 Success! You're Ready

Your Online Enrollment System is now fully operational!

---

**Support:** If you encounter any issues, check:
1. Command prompt shows no errors
2. `database.db` exists in the folder
3. Port 5000 is not blocked by firewall
4. Python is properly installed

**Version:** 1.0  
**Updated:** February 17, 2026  
**Status:** ✅ Ready to Deploy
