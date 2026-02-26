#!/bin/bash
BASE_URL="https://www.mrchildren.jp"
mkdir -p common video news other

# Download images
cd common
wget -q --no-check-certificate "${BASE_URL}/en/img/common/btn_apple_music.png"
wget -q --no-check-certificate "${BASE_URL}/en/img/common/btn_more.png"
wget -q --no-check-certificate "${BASE_URL}/en/img/common/btn_spotify.png"
cd ..

cd video
wget -q --no-check-certificate "${BASE_URL}/en/img/video/video013_s2.jpg"
wget -q --no-check-certificate "${BASE_URL}/en/img/video/video018_s2.jpg"
wget -q --no-check-certificate "${BASE_URL}/en/img/video/video901.jpg"
wget -q --no-check-certificate "${BASE_URL}/en/img/video/video902.jpg"
wget -q --no-check-certificate "${BASE_URL}/video/img/video071_s.jpg"
wget -q --no-check-certificate "${BASE_URL}/video/img/video076_s.jpg"
wget -q --no-check-certificate "${BASE_URL}/video/img/video080_s.jpg"
wget -q --no-check-certificate "${BASE_URL}/video/img/video081_s.jpg"
wget -q --no-check-certificate "${BASE_URL}/video/img/video084_s.jpg"
cd ..

cd news
wget -q --no-check-certificate "${BASE_URL}/news/img/2022_30th_tour.jpg"
wget -q --no-check-certificate "${BASE_URL}/news/img/icon_2023_halltuor.jpg"
wget -q --no-check-certificate "${BASE_URL}/news/img/icon_album_soundtracks.jpg"
wget -q --no-check-certificate "${BASE_URL}/news/img/icon_mrchildren.jpg"
cd ..

cd other
wget -q --no-check-certificate "${BASE_URL}/img/other/artistphoto2512.jpg"
cd ..

echo "Download complete!"
