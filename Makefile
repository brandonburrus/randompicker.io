default: build
.PHONY: build

yarn:
	@! command -v yarn && curl -o- -L https://yarnpkg.com/install.sh | bash || exit 0

setup: yarn
	@cd app && yarn -s install --frozen-lockfile

dev: yarn
	@cd app && yarn -s next dev

build: yarn
	@rm -rf build
	@cd app && yarn -s next build && yarn -s next export
	@mv app/out build

lint: yarn
	@cd app && yarn -s next lint
