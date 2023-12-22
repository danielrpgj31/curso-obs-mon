#Build
docker build -t app-sample-istio:v1 -f Dockerfile.no.mysql .

#Imagem tag para publicar em repostirório
docker tag <imagem id> <docker hub account name>/repositorio:<tag>
#Exemplo, de acordo com build acima
docker tag 8a9f14a2da6b danielribeirojr/app-sample-istio:v1
docker push danielribeirojr/app-sample-istio:v1