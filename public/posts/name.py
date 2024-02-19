import os
import re

def rename_folders():
    # Get all items in the current directory
    items = os.listdir('.')
    
    # Regular expression to match folders starting with a date string of the format yyyy-MM-dd
    date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}-(.*)$')
    
    for item in items:
        # Check if the item is a directory
        if os.path.isdir(item):
            # Use the regular expression to check if the folder name starts with a date
            match = date_pattern.match(item)
            if match:
                # Extract the new folder name by removing the date prefix
                new_folder_name = match.group(1)
                
                # Rename the folder
                os.rename(item, new_folder_name)
                print(f"Renamed '{item}' to '{new_folder_name}'")

if __name__ == "__main__":
    rename_folders()
