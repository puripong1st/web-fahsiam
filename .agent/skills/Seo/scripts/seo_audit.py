import sys
import os
from bs4 import BeautifulSoup
import json

def audit_seo(content, source_name="Unknown"):
    soup = BeautifulSoup(content, 'html.parser')
    results = {
        "source": source_name,
        "title": {
            "text": soup.title.string if soup.title else "N/A",
            "length": len(soup.title.string) if soup.title else 0,
            "status": "OK" if soup.title and 50 <= len(soup.title.string) <= 60 else "Review Needed"
        },
        "meta_description": {
            "text": "",
            "length": 0,
            "status": "Missing"
        },
        "headings": {
            "h1": [h.get_text().strip() for h in soup.find_all('h1')],
            "h2": [h.get_text().strip() for h in soup.find_all('h2')],
            "h3": [h.get_text().strip() for h in soup.find_all('h3')]
        },
        "images": {
            "total": len(soup.find_all('img')),
            "missing_alt": len([img for img in soup.find_all('img') if not img.get('alt')])
        }
    }

    desc = soup.find('meta', attrs={'name': 'description'})
    if desc:
        results["meta_description"]["text"] = desc.get('content', '')
        results["meta_description"]["length"] = len(results["meta_description"]["text"])
        results["meta_description"]["status"] = "OK" if 150 <= len(results["meta_description"]["text"]) <= 160 else "Review Needed"

    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 seo_audit.py <path_to_html_file>")
        sys.exit(1)

    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        sys.exit(1)

    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    audit_data = audit_seo(html_content, file_path)
    print(json.dumps(audit_data, indent=2, ensure_ascii=False))
