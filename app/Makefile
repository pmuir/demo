TAG:=v$(shell date +'%s')

.PHONY: deploy
deploy: publish
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: deploy-frontend
deploy-frontend: publish-frontend
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: deploy-backend
deploy-backend: publish-backend
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: deploy-new-customer
deploy-new-customer: publish-new-customer
	helmfile --file ./charts/helmfile.yaml apply

.PHONY: publish-frontend
publish-frontend:
	docker build -t pmuir/demo-app-frontend:$(TAG) ./frontend
	docker push pmuir/demo-app-frontend:$(TAG)
	sed -i "" -e "s/tag: .*/tag: $(TAG)/" ./charts/frontend/values.yaml
	sed -i "" -e "s/version:.*/version: $(TAG)/" ./charts/frontend/Chart.yaml

.PHONY: publish-backend
publish-backend:
	docker build -t pmuir/demo-app-backend:$(TAG) ./backend
	docker push pmuir/demo-app-backend:$(TAG)
	sed -i "" -e "s/tag: .*/tag: $(TAG)/" ./charts/backend/values.yaml
	sed -i "" -e "s/version:.*/version: $(TAG)/" ./charts/backend/Chart.yaml

.PHONY: publish-new-customer
publish-new-customer:
	docker build -t pmuir/demo-new-customer:$(TAG) ./new-customer
	docker push pmuir/demo-new-customer:$(TAG)
	sed -i "" -e "s/tag: .*/tag: $(TAG)/" ./charts/new-customer/values.yaml
	sed -i "" -e "s/version:.*/version: $(TAG)/" ./charts/new-customer/Chart.yaml

.PHONY: publish
publish: publish-frontend publish-backend publish-new-customer

.PHONY: clean
clean:
	rm -rf frontend/build
	rm -rf backend/dist

