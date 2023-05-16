import requests
import re
from bs4 import BeautifulSoup

url_base = "https://www.vinmec.com/vi/danh-sach/bac-si/ca-nuoc/noitieng-tieng-viet?page={}"
doctor_info = []

# loop through each page (page 1 to 10) and extract information for each doctor
for page_number in range(1, 11):
    url = url_base.format(page_number)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    doctors = soup.find_all("li", class_="")

    # loop through each doctor and extract their information
    for doctor in doctors:
        name_element = doctor.find("h2")
        name = name_element.text.strip() if name_element is not None else ""

        if name != '':
            brief_section = doctor.find("dl", class_="brief")
            if brief_section is not None:
                brief = []
                dt_elements = brief_section.find_all("dt")
                dd_elements = brief_section.find_all("dd")
                for dt, dd in zip(dt_elements, dd_elements):
                    dt_text = dt.text.strip() if dt is not None else ""
                    dd_text = dd.text.strip() if dd is not None else ""
                    brief.append((dt_text, dd_text))

                rank = brief[0][1].replace('\n', '').replace('\t', '')
                majorityFull = brief[1][1].replace('\n', '').replace('\t', '')
                desc = doctor.find("div", class_="desc").text.strip() if doctor.find("div", class_="desc") else ""
                desc = desc.replace('\n', '').replace('\t', '').replace('...Xem thêm', '...')

            media_section = doctor.find("div", class_="media")
            if media_section is not None:
                profile_image_element = media_section.find("a")
                if 'style' in profile_image_element.attrs:
                  profile_image_style = profile_image_element['style']
                  match = re.search(r'url\((.*?)\)', profile_image_style)
                  if match:
                      profile_image = match.group(1)
                  else:
                      profile_image = ""
            else:
                profile_image_style = ""
                profile_image = ""

            doctor_info.append({
                "name": name,
                "avaImage": profile_image,
                "rank": rank,
                "majorityFull": majorityFull,
                "desc": desc
            })

# print information for each doctor
for doctor in doctor_info:
    print(doctor)
