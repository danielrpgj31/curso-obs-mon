##Gerar Imagem

Gerar imagem, fazer a tag, subir no repositorio para entao a seguir, no k8s, implantar um deployment com esta app. 

```bash
$  docker build -t app-sample-istio:v1 -f Dockerfile.no.mysql .
$  docker images
$  docker tag 8a9f14a2da6b danielribeirojr/app-sample-istio:v1
$  docker images
$  docker push danielribeirojr/app-sample-istio:v1
```

##Implantar App no K8S

##Testar App pelo Nodeport 

##Configurar sidecar no namespace 

##Configurar Ingressgateway com App

##Testar App pelo Ingressgateway
