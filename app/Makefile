TAG ?= latest

.PHONY: deploy
deploy: publish
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: publish
publish:
	cd frontend; yarn build
	docker build -t pmuir/demo-app:$(TAG) ./frontend
	docker push pmuir/demo-app:$(TAG)

.PHONY: clean
clean:
	rm -rf build

