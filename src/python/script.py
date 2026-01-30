# import json
# import time
# import os
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from webdriver_manager.chrome import ChromeDriverManager

# def scrape_ranger_data(target_url, raw_text_block):
#     # --- กำหนด Path เป้าหมายแยกไฟล์ ---
#     path_8star = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\8c-info-special.json"
#     path_8star_ultimate = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\8u-info-special.json"

#     # 1. แยกกลุ่มข้อมูลที่จะค้นหา
#     lines = raw_text_block.strip().split('\n')
    
#     # List สำหรับเก็บผลลัพธ์แยกกัน
#     results_8c = [] # สำหรับ 8-Star ปกติ
#     results_8u = [] # สำหรับ 8-Star Ultimate Evolved

#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#     NEW_IMAGE_DOMAIN = "https://gachame.github.io/images/rangers/"

#     try:
#         driver.get(target_url)
#         time.sleep(4) 

#         for line in lines:
#             if not line.strip(): continue

#             # เช็คเงื่อนไขก่อนล้างคำเพื่อแยกไฟล์
#             is_ultimate = "Ultimate Evolved" in line
            
#             # ล้างคำเพื่อใช้ค้นหา
#             keyword = line.replace("8-Star ", "").replace("Ultimate Evolved ", "").strip()
            
#             print(f"กำลังค้นหา: '{keyword}' (ประเภท: {'Ultimate' if is_ultimate else 'Normal'})")
            
#             try:
#                 search_input = driver.find_element(By.CSS_SELECTOR, "#tblRangerBook_filter input")
#                 search_input.clear()
#                 search_input.send_keys(keyword)
#                 search_input.send_keys(Keys.RETURN)
                
#                 time.sleep(2)
#                 rows = driver.find_elements(By.CSS_SELECTOR, "#tblRangerBook tbody tr")
                
#                 found_match = False
#                 for row in rows:
#                     if "No matching records" in row.text: break
                    
#                     link_element = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
#                     image_name = link_element.text.strip()

#                     if image_name == keyword:
#                         href = link_element.get_attribute("href")
#                         unit_code = href.split('/')[-1]

#                         img_element = row.find_element(By.TAG_NAME, "img")
#                         original_src = img_element.get_attribute("src")
#                         file_name = original_src.split('/')[-1]
#                         custom_img_url = NEW_IMAGE_DOMAIN + file_name

#                         data = {
#                             "Name": image_name,
#                             "Image": custom_img_url,
#                             "UnitCode": unit_code
#                         }

#                         # 2. เก็บเข้า List ตามประเภทที่เช็คไว้ตอนแรก
#                         if is_ultimate:
#                             results_8u.append(data)
#                         else:
#                             results_8c.append(data)
                            
#                         print(f"✅ สำเร็จ: {image_name}")
#                         found_match = True
#                         break
                
#                 if not found_match: print(f"❌ ไม่พบข้อมูล: {keyword}")

#             except Exception as e:
#                 print(f"Error: {e}")

#         # 3. บันทึกแยกไฟล์ตาม Path ที่กำหนด
#         # บันทึกไฟล์ 8-Star (Normal)
#         with open(path_8star, 'w', encoding='utf-8') as f:
#             json.dump(results_8c, f, ensure_ascii=False, indent=2)
        
#         # บันทึกไฟล์ 8-Star Ultimate Evolved
#         with open(path_8star_ultimate, 'w', encoding='utf-8') as f:
#             json.dump(results_8u, f, ensure_ascii=False, indent=2)
        
#         print(f"\n--- เรียบร้อย! ---")
#         print(f"1. บันทึก 8c รวม {len(results_8c)} รายการ ที่: {path_8star}")
#         print(f"2. บันทึก 8u รวม {len(results_8u)} รายการ ที่: {path_8star_ultimate}")

#     finally:
#         driver.quit()

# def scrape_gear_data(target_url, raw_text_block):
#     # --- Path เป้าหมาย ---
#     target_full_path = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\gears\gears-info-special.json"

#     # 1. จัดการตัดคำ: เอาเฉพาะข้อความหลัง ]
#     lines = raw_text_block.strip().split('\n')
#     keywords_to_search = []
#     for line in lines:
#         if "]" in line:
#             clean_name = line.split("]")[-1].strip()
#             if clean_name: keywords_to_search.append(clean_name)

#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#     all_results = []
#     NEW_GEAR_DOMAIN = "https://gachame.github.io/images/gears/"

#     try:
#         driver.get(target_url)
#         time.sleep(5) 

#         for keyword in keywords_to_search:
#             print(f"กำลังค้นหาอุปกรณ์: '{keyword}'...")
#             try:
#                 # ใช้ ID ให้ตรงตาม HTML: tblEquipmentsBook
#                 search_input = driver.find_element(By.CSS_SELECTOR, "#tblEquipmentsBook_filter input")
#                 search_input.clear()
#                 search_input.send_keys(keyword)
#                 search_input.send_keys(Keys.ENTER)
                
#                 time.sleep(2)
                
#                 # ดึงแถวจากตาราง tblEquipmentsBook
#                 rows = driver.find_elements(By.CSS_SELECTOR, "#tblEquipmentsBook tbody tr")
                
#                 found_match = False
#                 for row in rows:
#                     if "No matching records" in row.text: break
                    
#                     try:
#                         name_element = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
#                         gear_name_from_web = name_element.text.strip() # จะได้ "[RoR3] Bident"
#                     except:
#                         continue

#                     # --- ปรับการเช็คเงื่อนไขตรงนี้ ---
#                     # เช็คว่าชื่อในเว็บลงท้ายด้วย Keyword ของเรา (เช่น "[RoR3] Bident" ลงท้ายด้วย "Bident")
#                     # หรือจะเช็คว่า keyword อยู่ในชื่อเว็บก็ได้
#                     if keyword in gear_name_from_web:
#                         img_element = row.find_element(By.CSS_SELECTOR, "td.col-icon img")
#                         original_src = img_element.get_attribute("src")
                        
#                         file_name = original_src.split('/')[-1]
#                         item_code = file_name.replace("_icon.png", "").replace(".png", "")
#                         custom_img_url = NEW_GEAR_DOMAIN + file_name

#                         all_results.append({
#                             "Name": keyword, # บันทึกชื่อตาม Keyword ที่เราต้องการ (ไม่มี [RoR3])
#                             "Image": custom_img_url,
#                             "ItemCode": item_code
#                         })
#                         print(f"✅ พบอุปกรณ์ (Match พบส่วนประกอบ): {gear_name_from_web} -> บันทึกเป็น {keyword}")
#                         found_match = True
#                         break
                
#                 if not found_match: print(f"❌ ไม่พบข้อมูลตรงเป๊ะ: {keyword}")

#             except Exception as e:
#                 print(f"เกิดข้อผิดพลาดขณะค้นหา {keyword}: {e}")

#         # บันทึกไฟล์
#         os.makedirs(os.path.dirname(target_full_path), exist_ok=True)
#         with open(target_full_path, 'w', encoding='utf-8') as f:
#             json.dump(all_results, f, ensure_ascii=False, indent=2)
#         print(f"\n--- บันทึกไฟล์ Gear สำเร็จที่: {target_full_path} ---")

#     finally:
#         driver.quit()

# import json
# import time
# import os
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from webdriver_manager.chrome import ChromeDriverManager

# def update_ranger_database(target_url, raw_text_block):
#     # --- กำหนด Path พื้นฐาน ---
#     base_path = r"D:\Arnut\Github\gachame-react-remake\public\assets\json-data\rangers\rate-normal"
#     path_8c = os.path.join(base_path, "8c-info.json")
#     path_8u = os.path.join(base_path, "8u-info.json")

#     # 1. เตรียมข้อมูลที่จะค้นหา
#     lines = raw_text_block.strip().split('\n')
    
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#     NEW_IMAGE_DOMAIN = "https://gachame.github.io/images/rangers/"

#     try:
#         driver.get(target_url)
#         time.sleep(5)

#         for line in lines:
#             if not line.strip(): continue

#             # แยกประเภทและล้าง Keyword
#             is_ultimate = "Ultimate Evolved" in line
#             target_file = path_8u if is_ultimate else path_8c
#             keyword = line.replace("8-Star ", "").replace("Ultimate Evolved ", "").strip()

#             # --- กติกาการ Append: อ่านไฟล์เดิมก่อน ---
#             existing_data = []
#             if os.path.exists(target_file):
#                 with open(target_file, 'r', encoding='utf-8') as f:
#                     try:
#                         existing_data = json.load(f)
#                     except: existing_data = []
            
#             # เก็บ UnitCode เดิมไว้เช็คซ้ำ
#             existing_codes = {item['UnitCode'] for item in existing_data}

#             print(f"🔎 กำลังค้นหา: '{keyword}'...")
            
#             try:
#                 search_input = driver.find_element(By.CSS_SELECTOR, "#tblRangerBook_filter input")
#                 search_input.clear()
#                 search_input.send_keys(keyword)
#                 search_input.send_keys(Keys.ENTER)
                
#                 time.sleep(2)
#                 rows = driver.find_elements(By.CSS_SELECTOR, "#tblRangerBook tbody tr")
                
#                 found_match = False
#                 for row in rows:
#                     if "No matching records" in row.text: break
#                     link_element = row.find_element(By.CSS_SELECTOR, "td:nth-child(2) a")
#                     image_name = link_element.text.strip()

#                     if image_name == keyword:
#                         unit_code = link_element.get_attribute("href").split('/')[-1]

#                         # ตรวจสอบว่ามีรหัสนี้หรือยัง
#                         if unit_code in existing_codes:
#                             print(f"⚠️ {image_name} มีอยู่ในระบบแล้ว (ข้าม)")
#                             found_match = True
#                             break

#                         img_element = row.find_element(By.TAG_NAME, "img")
#                         file_name = img_element.get_attribute("src").split('/')[-1]

#                         new_entry = {
#                             "Name": image_name,
#                             "Image": NEW_IMAGE_DOMAIN + file_name,
#                             "UnitCode": unit_code
#                         }

#                         # เพิ่มเข้า List และบันทึกกลับทันที
#                         existing_data.append(new_entry)
#                         with open(target_file, 'w', encoding='utf-8') as f:
#                             json.dump(existing_data, f, ensure_ascii=False, indent=2)
                        
#                         print(f"✅ เพิ่มข้อมูลใหม่ลงใน {os.path.basename(target_file)}: {image_name}")
#                         found_match = True
#                         break
                
#                 if not found_match: print(f"❌ ไม่พบข้อมูล: {keyword}")

#             except Exception as e:
#                 print(f"เกิดข้อผิดพลาด: {e}")

#     finally:
#         driver.quit()
#         print("\n--- ทำงานเสร็จสิ้น ---")


# # --- ข้อมูลอุปกรณ์ ---
# gear_raw_data = """
# 8-Star Weapon [RoR3]Bident
# 8-Star Weapon [RoR3]Staff of Beelzebub
# 8-Star Weapon [RoR3]Moonlight of Artemis
# 7-Star Accessory [RoR3]Qin Shi's Eyemask
# 7-Star Accessory [RoR3]Tesla Coil
# 6-Star Armor [RoR3]Hades' Clothes
# """

# # --- ข้อมูลตัวละครปกติ เดือนที่แล้ว ---
# raw_data = """
# 8-Star Hades
# 8-Star Qin Shi
# 8-Star Apollo
# 8-Star Tesla
# 8-Star Ultimate Evolved Underworld King Hades
# 8-Star Ultimate Evolved First Emperor Qin Shi
# 8-Star Ultimate Evolved Sun God Apollo
# 8-Star Ultimate Evolved Lone Sorcerer Tesla
# """

# # --- ข้อมูลที่ต้องการเพิ่ม (Copy มาวางได้เลย) ---
# raw_data = """
# 8-Star Candle Sally
# 8-Star Sleepyhead Moon
# 8-Star Ultimate Evolved Dimly Lit Candle Sally
# 8-Star Ultimate Evolved Soft & Fluffy Sleepyhead Moon
# """

# url = "https://rangers.lerico.net/en/rangers-book"
# update_ranger_database(url, raw_data)

# # ใช้ URL หน้าอุปกรณ์
# gear_url = "https://rangers.lerico.net/en/equipments-book"
# scrape_gear_data(gear_url, gear_raw_data)

# url = "https://rangers.lerico.net/en/rangers-book"
# scrape_ranger_data(url, raw_data)

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
8-Star Weapon [RoR3]Bident
8-Star Weapon [RoR3]Staff of Beelzebub
7-Star Accessory [RoR3]Tesla Coil
"""

#เรนเจอร์ปกติเดือนที่แล้ว copy จาก line rangers notice มาทั้งก้อนได้เลย
ranger_append_data = """
8-Star Candle Sally
8-Star Ultimate Evolved Dimly Lit Candle Sally
"""

#เรนเจอร์โคลาโบ copy จาก line rangers notice มาทั้งก้อนได้เลย
ranger_special_data = """
8-Star Hades
8-Star Ultimate Evolved Underworld King Hades
"""

#---- เปิดใช้ฟังชันพร้อมกัน -----
# 1. จัดการ Gear (Overwrite Special)
# scrape_gear_data("https://rangers.lerico.net/en/equipments-book", gear_data)

# 2. จัดการ Ranger (Append Normal)
# update_ranger_database("https://rangers.lerico.net/en/rangers-book", ranger_append_data)

# 3. จัดการ Ranger (Overwrite Special)
# scrape_ranger_data("https://rangers.lerico.net/en/rangers-book", ranger_special_data)
