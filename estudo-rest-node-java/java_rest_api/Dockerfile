FROM openjdk:21-jdk-slim

# Atualize o índice do pacote e instale o wget
RUN apt-get update && apt-get install -y wget

WORKDIR /app

COPY ./target/study.rest-0.0.1-SNAPSHOT.jar study.rest-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "study.rest-0.0.1-SNAPSHOT.jar"]