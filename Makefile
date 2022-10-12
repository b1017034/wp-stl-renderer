minify:
	uglifyjs --compress --mangle -- ./lib/js/STLHandler.js > ./lib/js/STLHandler.min.js
	uglifyjs --compress --mangle -- ./lib/js/OrbitControls.js > ./lib/js/OrbitControls.min.js
	uglifyjs --compress --mangle -- ./lib/js/STLLoader.js > ./lib/js/STLLoader.min.js

release:
	wp-scripts build --webpack-copy-php
	rm -f wp-stl-render.zip
	zip -r wp-stl-render.zip ./ -x "node_modules/*" ".github/*" ".git/*" ".gitignore" ".editorconfig" ".idea/*" "Makefile" "package-lock.json"
