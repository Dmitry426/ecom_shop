.PHONY: dev pre-commit eslint prettier

REACT_UTILS_DIR = react_front

dev: pre-commit

pre-commit:
	pre-commit install
	pre-commit autoupdate

eslint:
	cd $(REACT_UTILS_DIR) && npm run eslint
	
prettier : 
	cd $(REACT_UTILS_DIR) && npm run prettier 

lint : eslint prettier