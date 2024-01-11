import json

# Replace with the path to your input JSON file
input_file = "./DestinyInventoryItemDefinition.json"
# Replace with the path for the output JSON file
output_file = 'output.json'
# Read the current JSON file
with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Create a new dictionary with IDs as keys and JSON objects as values
new_data = {}
for item in data:
    item_json = json.loads(item['json'])
    new_data[item['id']] = item_json

# Write the new data to a file
with open(output_file, 'w', encoding='utf-8') as file:
    json.dump(new_data, file, indent=4)

print(f"Data has been transformed and saved to {output_file}")