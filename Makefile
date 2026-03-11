.PHONY: dev build preview lint install clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

clean:
	rm -rf dist node_modules/.vite
