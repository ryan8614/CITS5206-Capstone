# User Manual – Excel Sync Web Application

Welcome to the Excel Sync Web Application! This guide provides step-by-step instructions for signing up, logging in, editing contact list data, and managing the accommodation floor plan.

## 1. Access the Website

Open the application using the provided link:

https://cits-5206-capstone.vercel.app

## 2. Create an Account

1. On the homepage, click the **Sign Up** button.
2. Fill in the required information:
   - **Username**
   - **Email**
   - **Password**
3. Click **Register** to create your account.
4. You will be redirected to the **Login** page upon successful registration.

## 3. Log In

1. Click the **Sign In** button on the homepage.
2. Enter your **username** and **password**.
3. Click **Sign In** to access your dashboard.

## 4. Edit Contact List Data

1. After logging in, click on the **Edit** option in the top navigation bar.
2. Select **Contact List** from the side menu.
3. Choose a department file to edit. A spreadsheet interface will appear.
4. You can:
   - Edit cell values directly
   - Right-click to **add** or **delete rows**
   - Use dropdowns to select the source type: **Academic** or **Research**

📝 Note: Colors will be automatically assigned based on the selected source type.

## 5. Save Changes

- Click the **Save Changes** button at the top of the page.
- Changes will be saved and the contact list will automatically update.
- After refreshing the website, the list will appear reordered.

## 6. Accommodation Map Update

- The accommodation map is updated based on the contact list data.
- If a room number exists in the contact list and matches a valid room on the map, it will appear with updated contact info.
- If no matching room number is found, it will not be shown on the map.

## 7. Download Updated Contact List

Click the **Download** section in the top menu, the contact list file will be saved to your device with the latest changes applied.

## 8. Email notification

Flask Reminder System on PythonAnywhere

This manual explains how to set up, configure, and use a Flask-based reminder system hosted on PythonAnywhere. The system reads a `.json` file (such as a list of students or staff) and sends notifications (e.g., email) when specific conditions are met (such as dates matching today's date).

### 🧩 Overview

This 3rd-party based system includes:

- A Flask web app (for web access or API triggering)
- A JSON data file (e.g., `students_data.json`, will be stored on cloud)
- A reminder function that checks the data and triggers email alerts
- A scheduled task (cron job) to run the check daily
- An email system to notify target users

### 🛠️ Email Setup
#### Create App Password for System Email

If you're using Gmail (or another provider with 2FA):

1. Go to your Google Account > **Security**.
2. Enable **2-Step Verification** if not already on.
3. Go to **App passwords**.
4. Generate an **App Password** for "Mail".
5. Copy the password. You’ll use this instead of your Gmail password in your script.

Example config in `Auto_notify/config.py`:
```python
# Email account used to send the notifications
SYSTEM_EMAIL = os.environ.get("SYSTEM_EMAIL", "PUT THE SYSTEM MAILBOX HERE")

# App password for the sending email (never use your real email password)
SYSTEM_PASSWORD = os.environ.get("SYSTEM_PASSWORD", "REPLACE WITH THE APP PASSWORD")

# Target/recipient email for receiving the notifications
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "PUT THE TARGET MAILBOX HERE")
```

By now, you should be able to finish the email settings and could receive the reminder. 
