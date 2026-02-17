# Online Enrollment System - Backend

A fully functional Flask-based backend for the Online Enrollment System with SQLite database integration.

## 📋 Project Structure

```
enrollment_system/
├── app.py                    # Main Flask application
├── database.db              # SQLite database (auto-created)
├── requirements.txt         # Python dependencies
├── README.md                # This file
├── templates/
│   ├── index.html          # Enrollment form
│   ├── success.html        # Success page
│   └── error.html          # Error page
└── static/
    ├── style.css           # Form styling
    └── script.js           # Form validation
```

## 🚀 Quick Start

### Step 1: Install Python Dependencies

```bash
# Navigate to the enrollment_system directory
cd enrollment_system

# Install required packages
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
# Windows
python app.py

# Linux/macOS
python3 app.py
```

You should see:
```
============================================================
🚀 Online Enrollment System Backend Started
============================================================
📍 Server running at: http://localhost:5000
📂 Database location: [path]/database.db
============================================================
```

### Step 3: Access the System

Open your browser and go to:
```
http://localhost:5000
```

## 📦 Features

✅ **Automatic Database Initialization**
- Creates `database.db` on first run
- Sets up `students` table with all required columns
- No manual database setup needed

✅ **SQLite Database**
- 30 columns for complete student information
- Automated timestamp on submission
- Safe parameterized queries (no SQL injection)

✅ **RESTful Routes**
- `GET /` - Display enrollment form
- `POST /submit` - Process form submission
- `GET /success/<student_id>` - Show success page
- `GET /error` - Display error messages

✅ **Data Validation**
- Server-side security with parameterized queries
- Client-side validation in JavaScript
- Proper error handling and messages

✅ **Response Pages**
- Success page with Student ID confirmation
- Error page with detailed messages
- Next steps guidance

## 📊 Database Schema

### Students Table Columns:

**Personal Information:**
- `id` - Primary key
- `first_name` - Student's first name
- `middle_name` - Student's middle name
- `last_name` - Student's last name
- `address` - Complete address
- `date_of_birth` - DOB
- `place_of_birth` - POB
- `contact_number` - Phone number
- `gender` - Gender
- `citizenship` - Nationality
- `status` - Civil status

**Student Classification:**
- `student_type` - New/Old/Transferee
- `previous_school` - Previous institution (if Transferee)

**Family Information:**
- `father_name` - Father's name
- `father_contact` - Father's contact
- `father_occupation` - Father's occupation
- `mother_name` - Mother's name
- `mother_contact` - Mother's contact
- `mother_occupation` - Mother's occupation

**Educational Background:**
- `elementary_school` - Elementary school name
- `elementary_year` - Year graduated
- `junior_high_school` - Junior high school name
- `junior_high_year` - Year graduated
- `senior_high_school` - Senior high school name
- `senior_high_year` - Year graduated

**Course & Enrollment:**
- `course_selected` - Selected course
- `academic_year` - Academic year
- `semester` - Semester
- `signature` - Student signature
- `gcash_number` - GCash payment number

**Metadata:**
- `date_created` - Submission timestamp

## 🔒 Security Features

✅ **Parameterized Queries**
```python
cursor.execute('''
    INSERT INTO students (...) VALUES (?, ?, ?, ...)
''', (value1, value2, value3, ...))
```

✅ **No SQL Injection Risk**
- All user input is safely parameterized
- No string concatenation in SQL queries

✅ **CSRF Protection Ready**
- Form structure ready for Flask-WTF integration

## 📝 Form Integration

The form in `templates/index.html` includes:
- All 30+ input fields mapped to database columns
- Student ID generation on submission
- Automatic timestamp recording
- Validation feedback system

## 🔧 Configuration

### Default Settings (in `app.py`):
- **Debug Mode**: Enabled (`debug=True`)
- **Host**: localhost
- **Port**: 5000
- **Database**: SQLite (database.db in project root)

To change settings, edit `app.py`:
```python
app.run(debug=True, host='localhost', port=5000)
```

## 📥 Sample Form Submission

When a form is submitted via POST to `/submit`:

```javascript
{
  "student_type": "New Student",
  "first_name": "John",
  "middle_name": "Paul",
  "last_name": "Doe",
  "address": "123 Main St, City, Province",
  "date_of_birth": "2005-01-15",
  "place_of_birth": "Manila, Philippines",
  "contact_number": "09123456789",
  "gender": "Male",
  "citizenship": "Filipino",
  "status": "Single",
  ...
  "course": "Computer Programming Course",
  "gcash_number": "09987654321",
  "date_created": "2026-02-17 10:30:45"
}
```

## ✅ Testing the System

### 1. Open the Form
Navigate to `http://localhost:5000`

### 2. Fill Out the Form
Complete all required fields:
- Student Type (required)
- Personal Information (required)
- Educational Background
- Course Selection (required)

### 3. Submit
Click "Submit Enrollment" button

### 4. Verify Success
- Student ID should be displayed
- Database entry should be created
- You can check the database:

```bash
sqlite3 database.db
select * from students;
```

## 🐛 Troubleshooting

### Issue: Port 5000 already in use
```bash
# Change port in app.py
app.run(debug=True, host='localhost', port=5001)
```

### Issue: Module not found
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: Database permission error
```bash
# Check file permissions
# Or delete database.db to recreate it
del database.db
python app.py
```

## 📚 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Show enrollment form |
| POST | `/submit` | Submit enrollment |
| GET | `/success/<id>` | Show success page |
| GET | `/error` | Show error page |

## 🎓 Frontend Files

The system includes frontend files in the `static/` directory:

- **style.css** (5.4 KB) - Glassmorphism design, responsive layout
- **script.js** (6.2 KB) - Form validation, interactivity

The frontend is fully integrated with the Flask backend and requires no additional setup.

## 📧 Support

For issues or questions:
1. Check the error message displayed
2. Review the console logs
3. Check `database.db` structure
4. Contact admin@enrollment.edu

## 📄 License

This project is provided as-is for educational and institutional use.

## 🎯 Next Steps

After successful deployment:
1. Test form submissions
2. Verify database entries with:
   ```bash
   sqlite3 database.db
   SELECT COUNT(*) FROM students;
   ```
3. Configure email notifications (optional)
4. Set up payment gateway integration
5. Deploy to production server

---

**Version**: 1.0  
**Last Updated**: February 17, 2026  
**Status**: ✅ Ready for Deployment
