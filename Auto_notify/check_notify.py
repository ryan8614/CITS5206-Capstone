import json
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from config import SYSTEM_EMAIL, SYSTEM_PASSWORD, ADMIN_EMAIL

# Load data from JSON file
# for here, it's just test file to checking the functionality.
# so the path is actually the path in pythonanywhere files
with open('/home/AustinZ/Auto_notify/test.json', 'r') as f:
    data = json.load(f)

# Get today's date in format like '13-May-2025'
today_str = datetime.now().strftime('%d-%b-%Y')

# Flatten the data (iterate through categories like "Mgmt & Orgs")
expiring_today = []

for category in data:
    for person in data[category]:
        if person.get("End Date") == today_str:
            expiring_today.append(person)


# Email sending function
def send_email(person):
    body = f"""\
Hello,

This is a reminder that {person['Name']} ({person['Type']}, Pod No: {person['Pod No']})
is scheduled to leave today ({person['End Date']}).

Please confirm their current status and take necessary actions if required.

Comment: {person['Comment']}

Regards,
System
"""

    msg = MIMEText(body)
    msg["Subject"] = f"Departure Notification - {person['Name']}"
    msg["From"] = SYSTEM_EMAIL
    msg["To"] = ADMIN_EMAIL

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SYSTEM_EMAIL, SYSTEM_PASSWORD)
        server.send_message(msg)

# Send emails
for person in expiring_today:
    send_email(person)

print(f"Processed {len(expiring_today)} records.")
