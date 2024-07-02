# Rename all *.rain to *.html.twig
for file in *.rain; do
mv -- "$file" "${file%.rain}.html.twig"
done


De hoofdcategory aan de theme_setting binden of custom_fields "/catalog"