import pandas as pd
import json


excel_file = 'raw_data.xlsx' 

# Load the workbook
xls = pd.ExcelFile(excel_file)

# Dictionary to hold data from all sheets
all_data = {}

print("Starting Excel to JSON conversion...\n")


for sheet_name in xls.sheet_names:
    # Read the sheet (first 6 columns only)
    df = pd.read_excel(xls, sheet_name=sheet_name, usecols=range(6))

    # Drop completely blank rows(although I have manully dropped.)
    df.dropna(how='all', inplace=True)

    # Safely convert values for JSON (handle dates and missing values)
    def clean_value(x):
        if isinstance(x, pd.Timestamp):
            return x.strftime('%d-%b-%Y')
        elif pd.isna(x):
            return None
        else:
            return x

    df = df.applymap(clean_value)

    # Convert DataFrame to list of dicts
    records = df.to_dict(orient='records')
    all_data[sheet_name] = records

    # Print the count of transferred rows
    print(f"Transferred {len(records)} rows from sheet '{sheet_name}'.")

# Write the combined data to a JSON file
with open('students_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

print("\nConversion completed. JSON saved to 'students_data.json'.")
