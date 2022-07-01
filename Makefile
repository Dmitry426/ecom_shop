.PHONY: dev pre-commit eslint prettier

REACT_UTILS_DIR = front/react

dev: pre-commit

pre-commit:
	pre-commit install
	pre-commit autoupdate

eslint:
	cd $(REACT_UTILS_DIR) && npm run eslint

prettier :
	cd $(REACT_UTILS_DIR) && npm run prettier

lint_react : eslint prettier

isort:
	isort . --profile black

black:
	black .

mypy:
	mypy -p services_backend

flake8:
	flake8 .

pylint:
	pylint services_backend

lint_python: isort black mypy flake8 pylint

.PHONY: test_auth
test_auth:
	docker-compose -f Services/flask_auth/tests/docker-compose.yml down
	docker-compose -f Services/flask_auth/tests/docker-compose.yml build
	docker-compose -f Services/flask_auth/tests/docker-compose.yml up

.PHONY: test-cleanup
test_auth-cleanup:
	docker-compose -f flask_auth/src/tests/docker-compose.yml down
