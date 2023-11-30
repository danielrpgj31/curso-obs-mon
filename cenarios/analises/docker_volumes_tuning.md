## Avaliar performance em acesso a disco (File, BD, etc)

Avaliar o impacto no troughput da app quando volume do banco mysql for :

- NFS
- local

> NFS

Ajustar limite de trafego da maquina para avaliar impactos na app.

- Instalar

```yaml
version: "3"
services:
  nfs-server:
    image: itsthenetwork/nfs-server-alpine:latest
    privileged: true
    volumes:
      - /path/to/your/nfs/share:/exports
    ports:
      - "2049:2049"
```

- Suba o servidor

```bash
docker-compose up -d
```

- validar o servidor

```bash
showmount -e localhost
```

- ajustar servico da app para acessar volume nfs

```yaml
version: "3"
services:
  meu_servico:
    image: minha_imagem
    volumes:
      - meu_volume_nfs:nfs://localhost:/path/to/your/nfs/share
```
