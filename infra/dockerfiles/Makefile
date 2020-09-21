DOCKER_ORG := pmuir

publish:
	docker build . -t $(DOCKER_ORG)/connect-debezium:${VERSION}
	docker push $(DOCKER_ORG)/connect-debezium:${VERSION}

.PHONY: publish
