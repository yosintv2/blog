import os
import json
import subprocess
import time

def get_last_manual_commit_time():
    try:
        # Gets the timestamp of the last commit NOT made by the bot
        # This ensures the 24-hour timer is based on YOUR changes
        result = subprocess.run(
            ['git', 'log', '-1', '--perl-regexp', '--author=^((?!github-actions).*)$', '--format=%ct'],
            capture_output=True, text=True
        )
        return int(result.stdout.strip())
    except:
        # If error, return 0 to allow the script to run
        return 0

def update_files():
    interval_seconds = 24 * 3600  # 24 hours
    
    # 1. Check if 24 hours passed since YOUR last change
    last_manual_update = get_last_manual_commit_time()
    current_time = int(time.time())
    
    if (current_time - last_manual_update) < interval_seconds:
        hours_left = (interval_seconds - (current_time - last_manual_update)) / 3600
        print(f"Waiting: Your last change was recent. Auto-update in {hours_left:.1f} hours.")
        return

    # 2. Configuration
    exclude_files = [
        "abc.json", "xyz.json", "123.json", "bbl.json", 
        "ilt20.json", "drcongo.json", "senegal.json", 
        "nigeria.json", "tunisia.json", "arsenal.json",
        "package.json", "package-lock.json" # Common files to avoid breaking
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

    # 3. Search for .json files in the ROOT directory
    updated_count = 0
    for filename in os.listdir('.'):
        if filename.endswith('.json') and filename not in exclude_files:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            updated_count += 1
            
    print(f"Success! Updated {updated_count} files in the main directory.")

if __name__ == "__main__":
    update_files()
