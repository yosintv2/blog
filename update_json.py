import os
import json
import subprocess
import time

def get_last_commit_time():
    try:
        # Gets the timestamp of the last commit in the blog folder
        result = subprocess.run(
            ['git', 'log', '-1', '--format=%ct', 'blog/'],
            capture_output=True, text=True
        )
        return int(result.stdout.strip())
    except:
        return 0

def update_files():
    target_folder = "blog"
    interval_seconds = 24 * 3600  # 24 hours
    
    # 1. Check timing
    last_update = get_last_commit_time()
    current_time = int(time.time())
    
    if (current_time - last_update) < interval_seconds:
        hours_to_wait = (interval_seconds - (current_time - last_update)) / 3600
        print(f"Waiting: Last manual change was too recent. Try again in {hours_to_wait:.1f} hours.")
        return

    # 2. Configuration
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
                
                "___sulist___"
                
                ,
                
                "___topembed___"
            ],
            "styles": {
                "livee": "display: flex; justify-content: center; align-items: center; text-decoration: none; color: inherit; margin: 5px 0; padding: 10px; border: 2px solid #000; border-radius: 5px; cursor: pointer; transition: box-shadow 0.3s ease; background-color: #2e7d32; color: white;font-weight: bold;",
                "liveeHover": "box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);",
                "liveeName": "flex: 2; text-align: center; color: white; font-weight: bold;"
            }
        }
    ]

    # 3. Apply Updates
    updated_count = 0
    for filename in os.listdir(target_folder):
        if filename.endswith('.json') and filename not in exclude_files:
            file_path = os.path.join(target_folder, filename)
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            updated_count += 1
            
    print(f"Success! 24 hours have passed since last manual change. Updated {updated_count} files.")

if __name__ == "__main__":
    update_files()
