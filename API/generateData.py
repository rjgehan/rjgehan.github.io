import csv
import json

# Initialize an empty dictionary
data = {"Weapons": {}}

# Open the CSV file
with open('./dataDownloads/download.csv', mode='r') as file:
    reader = csv.DictReader(file)
    
    # Process each row in the CSV
    for row in reader:
        ammo = row['Ammo']
        weap_tag = row['Weap. Tag']
        frame_weapon = row['Frame/Weapon']

        # Create nested dictionary structure if not exist
        if ammo not in data['Weapons']:
            data['Weapons'][ammo] = {}
        if weap_tag not in data['Weapons'][ammo]:
            data['Weapons'][ammo][weap_tag] = {}
        if frame_weapon not in data['Weapons'][ammo][weap_tag]:
            data['Weapons'][ammo][weap_tag][frame_weapon] = []

        # Append the row to the correct list
        data['Weapons'][ammo][weap_tag][frame_weapon].append(row)

# Convert the dictionary to a JSON string
json_data = json.dumps(data, indent=4)

# Write the JSON string to a file
with open('data.json', 'w') as json_file:
    json_file.write(json_data)
