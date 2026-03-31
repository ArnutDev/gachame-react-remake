import json
import time
import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

# --- ฟังก์ชันส่วนกลาง: ดาวน์โหลดรูปภาพ ---
def download_image(url, folder_path, file_name):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path, exist_ok=True)
    
    save_path = os.path.join(folder_path, file_name)
    
    # ถ้ามีไฟล์อยู่แล้ว ข้ามการโหลด
    if os.path.exists(save_path):
        return

    try:
        # ดึง URL เต็มกรณีเป็น Relative Path
        response = requests.get(url, stream=True, timeout=15)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"   📥 Downloaded: {file_name}")
    except Exception as e:
        print(f"   ⚠️ Failed to download {file_name}: {e}")

# --- 1. ฟังก์ชัน Ranger (Scrape & Overwrite Special JSON) ---
def scrape_ranger_data(target_url, raw_text_block):
    path_8star = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\8c-info-special.json"
    path_8star_ultimate = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\8u-info-special.json"
    image_folder = r"D:\Arnut\Github\gachame-react-remake\src\python\images_for_github\rangers"

    lines = raw_text_block.strip().split('\n')
    results_8c, results_8u = [], []

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    NEW_DOMAIN = "https://gachame.github.io/images/rangers/"

    try:
        driver.get(target_url)
        time.sleep(4) 
        for line in lines:
            if not line.strip(): continue
            is_ultimate = "Ultimate Evolved" in line
            keyword = line.replace("8-Star ", "").replace("Ultimate Evolved ", "").strip()
            
            print(f"🔎 ค้นหา Ranger (Special): {keyword}")
            try:
                search_input = driver.find_element(By.CSS_SELECTOR, "#tblRangerBook_filter input")
                search_input.clear()
                search_input.send_keys(keyword + Keys.RETURN)
                time.sleep(2)
                
                rows = driver.find_elements(By.CSS_SELECTOR, "#tblRangerBook tbody tr")
                for row in rows:
                    if "No matching records" in row.text: break
                    link_el = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
                    if link_el.text.strip() == keyword:
                        img_src = row.find_element(By.TAG_NAME, "img").get_attribute("src")
                        file_name = img_src.split('/')[-1]
                        
                        download_image(img_src, image_folder, file_name)

                        data = {"Name": keyword, "Image": NEW_DOMAIN + file_name, "UnitCode": link_el.get_attribute("href").split('/')[-1]}
                        if is_ultimate: results_8u.append(data)
                        else: results_8c.append(data)
                        break
            except Exception as e: print(f"   ❌ Error: {e}")

        with open(path_8star, 'w', encoding='utf-8') as f: json.dump(results_8c, f, ensure_ascii=False, indent=2)
        with open(path_8star_ultimate, 'w', encoding='utf-8') as f: json.dump(results_8u, f, ensure_ascii=False, indent=2)
    finally: driver.quit()

# --- 2. ฟังก์ชัน Gear (Scrape & Overwrite Special JSON) ---
def scrape_gear_data(target_url, raw_text_block):
    target_full_path = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\gears\gears-info-special.json"
    image_folder = r"D:\Arnut\Github\gachame-react-remake\src\python\images_for_github\gears"

    lines = raw_text_block.strip().split('\n')
    keywords = [line.split("]")[-1].strip() for line in lines if "]" in line]

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    all_results = []
    NEW_DOMAIN = "https://gachame.github.io/images/gears/"

    try:
        driver.get(target_url)
        time.sleep(5) 
        for keyword in keywords:
            print(f"🔎 ค้นหา Gear: {keyword}")
            try:
                search_input = driver.find_element(By.CSS_SELECTOR, "#tblEquipmentsBook_filter input")
                search_input.clear()
                search_input.send_keys(keyword + Keys.ENTER)
                time.sleep(2)
                
                rows = driver.find_elements(By.CSS_SELECTOR, "#tblEquipmentsBook tbody tr")
                for row in rows:
                    if "No matching records" in row.text: break
                    name_el = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
                    if keyword in name_el.text.strip():
                        img_src = row.find_element(By.CSS_SELECTOR, "td.col-icon img").get_attribute("src")
                        file_name = img_src.split('/')[-1]
                        
                        download_image(img_src, image_folder, file_name)

                        all_results.append({
                            "Name": keyword, 
                            "Image": NEW_DOMAIN + file_name,
                            "ItemCode": file_name.replace("_icon.png", "").replace(".png", "")
                        })
                        break
            except Exception as e: print(f"   ❌ Error: {e}")
        with open(target_full_path, 'w', encoding='utf-8') as f: json.dump(all_results, f, ensure_ascii=False, indent=2)
    finally: driver.quit()

# --- 3. ฟังก์ชัน Ranger (Append to Normal Database) ---
def update_ranger_database(target_url, raw_text_block):
    base_path = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\rate-normal"
    image_folder = r"D:\Arnut\Github\gachame-react-remake\src\python\images_for_github\rangers"

    lines = raw_text_block.strip().split('\n')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    NEW_DOMAIN = "https://gachame.github.io/images/rangers/"

    try:
        driver.get(target_url)
        time.sleep(5)
        for line in lines:
            if not line.strip(): continue
            is_ultimate = "Ultimate Evolved" in line
            target_file = os.path.join(base_path, "8u-info.json" if is_ultimate else "8c-info.json")
            keyword = line.replace("8-Star ", "").replace("Ultimate Evolved ", "").strip()

            existing_data = []
            if os.path.exists(target_file):
                with open(target_file, 'r', encoding='utf-8') as f:
                    try: existing_data = json.load(f)
                    except: pass
            
            existing_codes = {item['UnitCode'] for item in existing_data}

            print(f"🔎 ค้นหา Ranger (Append): {keyword}")
            try:
                search_input = driver.find_element(By.CSS_SELECTOR, "#tblRangerBook_filter input")
                search_input.clear()
                search_input.send_keys(keyword + Keys.ENTER)
                time.sleep(2)
                
                rows = driver.find_elements(By.CSS_SELECTOR, "#tblRangerBook tbody tr")
                for row in rows:
                    if "No matching records" in row.text: break
                    link_el = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
                    if link_el.text.strip() == keyword:
                        unit_code = link_el.get_attribute("href").split('/')[-1]
                        img_src = row.find_element(By.TAG_NAME, "img").get_attribute("src")
                        file_name = img_src.split('/')[-1]

                        download_image(img_src, image_folder, file_name)

                        if unit_code not in existing_codes:
                            existing_data.append({"Name": keyword, "Image": NEW_DOMAIN + file_name, "UnitCode": unit_code})
                            with open(target_file, 'w', encoding='utf-8') as f: json.dump(existing_data, f, ensure_ascii=False, indent=2)
                            print(f"   ✅ Appended: {keyword}")
                        break
            except Exception as e: print(f"   ❌ Error: {e}")
    finally: driver.quit()


# --- EXECUTION ---
#เกียร์โคลาโบ copy จาก linerangers notice มาทั้งก้อนได้เลย
gear_data = """
8-Star Armor [DA]Miden Yukata
8-Star Armor [DA]Naruhiko's Headphones
8-Star Armor [DA]Renri's Earrings
7-Star Weapon [DA]Soji's Smartphone
7-Star Weapon [DA]Banhammer
6-Star Accessory [DA]Denmi-chan
"""

#เรนเจอร์ปกติเดือนที่แล้ว copy จาก line rangers notice มาทั้งก้อนได้เลย
ranger_append_data = """
Best Disciple Cony
Iron Wall Prodigy Cony
Taekwondo Sally
Blue Taeguk Sally
"""

#เรนเจอร์โคลาโบ copy จาก line rangers notice มาทั้งก้อนได้เลย
ranger_special_data = """
8-Star Soji
8-Star Kukuru
8-Star Renri
8-Star Naruhiko
8-Star Ultimate Evolved Akari's Brother Soji
8-Star Ultimate Evolved Serious Kukuru
8-Star Ultimate Evolved Sharp-Tongued Renri
8-Star Ultimate Evolved Easily-Scared Naruhiko
"""

#---- เปิดใช้ฟังชันพร้อมกัน -----
# 1. จัดการ Gear (Overwrite Special)
scrape_gear_data("https://rangers.lerico.net/en/equipments-book", gear_data)

# 2. จัดการ Ranger (Append Normal) (ต้องแยก ultra ไปใส่ในไฟล์มันเอง)
update_ranger_database("https://rangers.lerico.net/en/rangers-book", ranger_append_data)

# 3. จัดการ Ranger (Overwrite Special)
scrape_ranger_data("https://rangers.lerico.net/en/rangers-book", ranger_special_data)
