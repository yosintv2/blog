import os
import json
import time

def update_files():
    target_folder = "blog"
    timestamp_file = "last_run.txt"
    interval_hours = 30
    
    # 1. Check if 30 hours have passed
    current_time = time.time()
    if os.path.exists(timestamp_file):
        with open(timestamp_file, "r") as f:
            last_run = float(f.read().strip())
        
        hours_since_last_run = (current_time - last_run) / 3600
        if hours_since_last_run < interval_hours:
            print(f"Skipping: Only {hours_since_last_run:.1f} hours passed. Need {interval_hours}.")
            return

    # 2. Define Exclusions and Template
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

___sulist___ ,

___topembed___

  ],
  "styles": {
    "livee": "display: flex; justify-content: center; align-items: center; text-decoration: none; color: inherit; margin: 5px 0; padding: 10px; border: 2px solid #000; border-radius: 5px; cursor: pointer; transition: box-shadow 0.3s ease; background-color: #2e7d32; color: white;font-weight: bold;",
    "liveeHover": "box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);",
    "liveeName": "flex: 2; text-align: center; color: white; font-weight: bold;"
  }
}
    ]

    # 3. Update the files
    if not os.path.exists(target_folder):
        print(f"Error: Folder '{target_folder}' not found.")
        return

    updated_count = 0
    for filename in os.listdir(target_folder):
        if filename.endswith('.json') and filename not in exclude_files:
            file_path = os.path.join(target_folder, filename)
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            updated_count += 1
            
    # 4. Save the new timestamp
    with open(timestamp_file, "w") as f:
        f.write(str(current_time))
        
    print(f"Success! Updated {updated_count} files. Next update in 30 hours.")

if __name__ == "__main__":
    update_files()
