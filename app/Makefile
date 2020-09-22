TAG:=v$(shell date +'%s')

.PHONY: deploy
deploy: publish
	sed -i "" -e "s/tag: .*/tag: $(TAG)/" ./charts/frontend/values.yaml
	sed -i "" -e "s/version:.*/version: $(TAG)/" ./charts/frontend/Chart.yaml

	sed -i "" -e "s/tag: .*/tag: $(TAG)/" ./charts/backend/values.yaml
	sed -i "" -e "s/version:.*/version: $(TAG)/" ./charts/backend/Chart.yaml
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: publish-frontend
publish-frontend:
	docker build -t pmuir/demo-app-frontend:$(TAG) ./frontend
	docker push pmuir/demo-app-frontend:$(TAG)

.PHONY: publish-backend
publish-backend:
	docker build -t pmuir/demo-app-backend:$(TAG) ./backend
	docker push pmuir/demo-app-backend:$(TAG)

.PHONY: publish
publish: publish-frontend publish-backend

.PHONY: clean
clean:
	rm -rf frontend/build
	rm -rf backend/dist

