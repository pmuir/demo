FROM strimzi/kafka:0.17.0-kafka-2.4.0
USER root:root
RUN mkdir -p /opt/kafka/plugins/debezium
RUN curl https://repo1.maven.org/maven2/io/debezium/debezium-connector-mysql/1.3.0.Beta1/debezium-connector-mysql-1.3.0.Beta1-plugin.tar.gz | tar xvz --strip-components=1 -C /opt/kafka/plugins/debezium/
USER 1001
