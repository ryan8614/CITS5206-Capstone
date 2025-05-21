# Auto_notify System Handover Document

## Overview

The `Auto_notify` system is designed to automate email notifications for student or staff departures based on data stored in JSON files. It is intended to run as a scheduled job and send notifications to an administrator when a person's "End Date" matches the current date.

## System Architecture

- **Platform**: The notification script is intended to run on [PythonAnywhere](https://www.pythonanywhere.com/) or a similar cloud-based Python execution environment.
- **Language**: Python 3.x
- **Key Files**:
  - `check_notify.py`: Main script for checking departures and sending notifications.
  - `config.py`: Stores email configuration (system mailbox, password, admin email).
  - `students_data.json` / `test.json`: Data sources containing records of students/staff.
- **Dependencies**: Standard Python libraries (`json`, `datetime`, `smtplib`, `email.mime.text`). No external packages required.

## File Descriptions

- **check_notify.py**
  - Loads data from the JSON file (default: `test.json` for testing, `students_data.json` for production).
  - Checks for any records where "End Date" matches today's date.
  - Sends an email notification for each matching record using SMTP (Gmail example).
  - Prints the number of processed records.

- **config.py**
  - Contains three variables:
    - `SYSTEM_EMAIL`: The sender's email address (e.g., a Gmail account).
    - `SYSTEM_PASSWORD`: The app password for the sender's email.
    - `ADMIN_EMAIL`: The recipient's email address for notifications.
  - **Important**: Update these values before deployment.

- **students_data.json** / **test.json**
  - JSON files containing categorized lists of people (e.g., "Mgmt & Orgs", "Economics").
  - Each entry includes fields: "No", "Name", "End Date", "Comment", "Pod No", "Type".
  - `test.json` is a copy of `students_data.json` with additional test data for development purposes.

## Setup & Configuration

1. **Email Setup**
   - Use a Gmail account for sending emails.
   - Enable "App Passwords" in Gmail security settings and use the generated password in `config.py`.
   - Set `SYSTEM_EMAIL` and `ADMIN_EMAIL` accordingly.

2. **Data Files**
   - Place the relevant JSON data file (`students_data.json` or `test.json`) in the same directory as the script.
   - Ensure the data format matches the expected schema.

3. **PythonAnywhere Deployment**
   - Upload all files (`check_notify.py`, `config.py`, and data files) to your PythonAnywhere account.
   - Set up a scheduled task (e.g., daily) to run `check_notify.py`.
   - Ensure the working directory is correct and all file paths are valid.

## Running the Script

- **Manual Run**:  
  ```bash
  python3 check_notify.py
  ```
  This will process today's departures and send emails as needed.

- Scheduled Run : Use PythonAnywhere's "Tasks" feature to schedule the script to run daily.
## Customization & Maintenance
- Changing Data Source : Modify the file path in check_notify.py to switch between test.json and students_data.json .
- Adding/Removing Recipients : Update ADMIN_EMAIL in config.py to change the notification recipient.
- Extending Functionality :
  
  - To support multiple recipients, modify the send_email function to accept a list.
  - To change the email template, edit the body string in send_email .
- Error Handling :
  
  - The script prints errors to the console. For production, consider logging errors to a file or external service.
## Security Notes
- Credentials : Never commit real email credentials to version control. Use environment variables or secure vaults in production.
- Data Privacy : Ensure that the data in JSON files does not contain sensitive information beyond what is necessary for notifications.
## Troubleshooting
- Emails Not Sending :
  
  - Check Gmail security settings (allow "less secure apps" or use app passwords).
  - Verify internet connectivity and correct credentials in config.py .
- No Notifications Sent :
  
  - Ensure the "End Date" in the data matches the current date format ( %d-%b-%Y ).
  - Check that the JSON file is up to date and accessible.