default: build
.PHONY: build

setup:
	@cd app && yarn -s install --frozen-lockfile

dev:
	@cd app && yarn -s next dev

build:
	@rm -rf build
	@cd app && yarn -s next build && yarn -s next export
	@mv app/out build

lint:
	@cd app && yarn -s next lint
