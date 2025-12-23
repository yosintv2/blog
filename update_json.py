import os
import json

def update_files():
    exclude_files = ["abc.json", "xyz.json", "123.json"]
    
    # The JSON structure exactly as you requested
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
    # Search for all json files in the root directory
    for filename in os.listdir('.'):
        if filename.endswith('.json') and filename not in exclude_files:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(template_data, f, indent=2)
            print(f"Updated: {filename}")
            updated_count += 1
            
    print(f"Total files updated: {updated_count}")

if __name__ == "__main__":
    update_files()
