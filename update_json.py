import os
import json
import subprocess
import time
import sys

def get_last_manual_commit_info():
    try:
        # Gets the timestamp and hash of the last commit NOT made by the bot
        result = subprocess.run(
            ['git', 'log', '-1', '--perl-regexp', '--author=^((?!github-actions).*)$', '--format=%ct|%H'],
            capture_output=True, text=True
        )
        data = result.stdout.strip().split('|')
        return int(data[0]), data[1]
    except:
        return 0, ""

def update_files():
    force_update = len(sys.argv) > 1 and sys.argv[1] == "--force"
    state_file = "last_sync_hash.txt"
    
    last_manual_time, last_manual_hash = get_last_manual_commit_info()
    current_time = int(time.time())
    
    # Check if a state file exists to see if we've already synced this manual change
    last_synced_hash = ""
    if os.path.exists(state_file):
        with open(state_file, 'r') as f:
            last_synced_hash = f.read().strip()

    # LOGIC: If the last manual change is the same one we already synced, STOP.
    if not force_update and last_manual_hash == last_synced_hash:
        print("No new manual changes detected since last sync. Standing by.")
        return

    # LOGIC: If there IS a new change, wait 24 hours from that change
    if not force_update:
        seconds_since_change = current_time - last_manual_time
        if seconds_since_change < (12 * 3600):
            hours_left = ( (12 * 3600) - seconds_since_change ) / 3600
            print(f"Manual change detected ({last_manual_hash[:7]}). Waiting {hours_left:.1f} more hours to sync.")
            return

    # Configuration
    exclude_files = [

        "123.json", 
        "bbl.json", 
        "bpl.json", #Add Upper undeletable json
        "update_json.py", state_file
    ]
    
    template_data = {
        "events": [
            { "name": "Join YoSinTV Telegram Channel", "link": "https://t.me/yosintvlive" },
            
            "______________________________"
        
        ],
        "styles": {
            "livee": "display: flex; justify-content: center; align-items: center; text-decoration: none; color: inherit; margin: 5px 0; padding: 10px; border: 2px solid #000; border-radius: 5px; cursor: pointer; transition: box-shadow 0.3s ease; background-color: #2e7d32; color: white;font-weight: bold;",
            "liveeHover": "box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);",
            "liveeName": "flex: 2; text-align: center; color: white; font-weight: bold;"
        }
    }

    updated_count = 0
    for filename in os.listdir('.'):
        if filename.endswith('.json') and filename not in exclude_files:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            updated_count += 1
    
    # Save the hash so we don't update again until you make a NEW change
    with open(state_file, 'w') as f:
        f.write(last_manual_hash)
            
    print(f"Success! Synced {updated_count} files based on manual change {last_manual_hash[:7]}.")

if __name__ == "__main__":
    update_files()
