release:
	wp-scripts build --webpack-copy-php
	rm -f wp-stl-render.zip
	zip -r wp-stl-render.zip ./ -x "node_modules/*" ".github/*" ".git/*" ".gitignore" ".editorconfig" ".idea/*" "Makefile" "package-lock.json"
