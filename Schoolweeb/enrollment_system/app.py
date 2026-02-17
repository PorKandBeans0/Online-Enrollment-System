import os
import sqlite3
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for
from pathlib import Path

app = Flask(__name__, template_folder='templates', static_folder='static')

# Set database path in the project root
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def init_db():
    """Initialize the database and create the students table if it doesn't exist"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Create students table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_type TEXT NOT NULL,
            previous_school TEXT,
            first_name TEXT NOT NULL,
            middle_name TEXT,
            last_name TEXT NOT NULL,
            address TEXT NOT NULL,
            date_of_birth DATE NOT NULL,
            place_of_birth TEXT NOT NULL,
            contact_number TEXT NOT NULL,
            gender TEXT NOT NULL,
            citizenship TEXT NOT NULL,
            status TEXT NOT NULL,
            father_name TEXT,
            father_contact TEXT,
            father_occupation TEXT,
            mother_name TEXT,
            mother_contact TEXT,
            mother_occupation TEXT,
            elementary_school TEXT,
            elementary_year TEXT,
            junior_high_school TEXT,
            junior_high_year TEXT,
            senior_high_school TEXT,
            senior_high_year TEXT,
            course_selected TEXT NOT NULL,
            academic_year TEXT,
            semester TEXT,
            signature TEXT,
            gcash_number TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✓ Database initialized successfully!")

def save_enrollment(data):
    """Save enrollment data to database with parameterized queries"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO students (
                student_type, previous_school, first_name, middle_name, last_name,
                address, date_of_birth, place_of_birth, contact_number, gender,
                citizenship, status, father_name, father_contact, father_occupation,
                mother_name, mother_contact, mother_occupation, elementary_school,
                elementary_year, junior_high_school, junior_high_year, senior_high_school,
                senior_high_year, course_selected, academic_year, semester,
                signature, gcash_number, date_created
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        ''', (
            data.get('student_type'),
            data.get('previous_school', ''),
            data.get('first_name'),
            data.get('middle_name', ''),
            data.get('last_name'),
            data.get('address'),
            data.get('date_of_birth'),
            data.get('place_of_birth'),
            data.get('contact_number'),
            data.get('gender'),
            data.get('citizenship'),
            data.get('status'),
            data.get('father_name', ''),
            data.get('father_contact', ''),
            data.get('father_occupation', ''),
            data.get('mother_name', ''),
            data.get('mother_contact', ''),
            data.get('mother_occupation', ''),
            data.get('elementary_school', ''),
            data.get('elementary_year', ''),
            data.get('junior_high_school', ''),
            data.get('junior_high_year', ''),
            data.get('senior_high_school', ''),
            data.get('senior_high_year', ''),
            data.get('course'),
            data.get('academic_year'),
            data.get('semester'),
            data.get('signature', ''),
            data.get('gcash_number', ''),
            datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ))
        
        conn.commit()
        student_id = cursor.lastrowid
        conn.close()
        return student_id
    
    except Exception as e:
        conn.close()
        print(f"Error saving enrollment: {str(e)}")
        return None

@app.route('/')
def index():
    """Display enrollment form"""
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_enrollment():
    """Handle enrollment form submission"""
    try:
        # Get all form data
        form_data = request.form.to_dict()
        
        # Save to database
        student_id = save_enrollment(form_data)
        
        if student_id:
            # Redirect to success page with student ID
            return redirect(url_for('success', student_id=student_id))
        else:
            # Redirect to error page
            return redirect(url_for('error', message='Failed to save enrollment'))
    
    except Exception as e:
        return redirect(url_for('error', message=str(e)))

@app.route('/success/<student_id>')
def success(student_id):
    """Display success message"""
    return render_template('success.html', student_id=student_id)

@app.route('/error')
def error():
    """Display error message"""
    message = request.args.get('message', 'An error occurred')
    return render_template('error.html', message=message)

@app.shell_context_processor
def make_shell_context():
    """Make database initialization available in Flask shell"""
    return {'init_db': init_db}

if __name__ == '__main__':
    # Initialize database on startup
    if not os.path.exists(DATABASE_PATH):
        print("Creating new database...")
        init_db()
    else:
        print(f"Database found at: {DATABASE_PATH}")
    
    # Get local IP address
    import socket
    try:
        local_ip = socket.gethostbyname(socket.gethostname())
    except:
        local_ip = "127.0.0.1"
    
    # Run Flask development server
    print("\n" + "="*60)
    print("🚀 Online Enrollment System Backend Started")
    print("="*60)
    print("📍 Local Access: http://localhost:5000")
    print(f"📱 Mobile Access: http://{local_ip}:5000")
    print("📂 Database location:", DATABASE_PATH)
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
