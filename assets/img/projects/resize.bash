mkdir -p assets/img/projects/

for file in *.jpg; do
  convert "$file" \
    -resize "1600x900^" \
    -gravity center \
    -extent 1600x900 \
    -quality 85 \
    "assets/img/projects/${file%.*}.jpg"
done
