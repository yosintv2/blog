import os
import json

def update_files():
    # This checks the current directory and the 'blog' subdirectory
    target_folder = "blog"
    
    # Check if we are already inside 'blog' or if it's a subfolder
    if not os.path.exists(target_folder):
        print(f"Current Directory: {os.getcwd()}")
        print(f"Contents: {os.listdir('.')}")
        print(f"Error: Folder '{target_folder}' not found. Trying root...")
        search_path = "."
    else:
        search_path = target_folder

    exclude_files = [
        "abc.json", "xyz.json", "123.json", "bbl.json", 
        "ilt20.json", "drcongo.json", "senegal.json", 
        "nigeria.json", "tunisia.json", "arsenal.json"
    ]
    
    template_data = [
        {
            "events": [
                {
                    "name": "Join YoSinTV Telegram Channel",
                    "link": "https://t.me/yosintvlive"
                },
                "___sulist___",
                "___topembed___"
            ],
            "styles": {
                "livee": "display: flex; justify-content: center; align-items: center; text-decoration: none; color: inherit; margin: 5px 0; padding: 10px; border: 2px solid #000; border-radius: 5px; cursor: pointer; transition: box-shadow 0.3s ease; background-color: #2e7d32; color: white;font-weight: bold;",
                "liveeHover": "box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);",
                "liveeName": "flex: 2; text-align: center; color: white; font-weight: bold;"
            }
        }
    ]

    updated_count = 0
    for filename in os.listdir(search_path):
        if filename.endswith('.json') and filename not in exclude_files:
            file_path = os.path.join(search_path, filename)
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            updated_count += 1
            
    print(f"Done! Successfully updated {updated_count} files in '{search_path}'.")

if __name__ == "__main__":
    update_files()
