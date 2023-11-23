provider "docker" {}

resource "docker_network" "my_network" {
  name = "my_network"
}

resource "docker_container" "nginx" {
  name  = "nginx"
  image = "nginx:latest"
  ports {
    internal = 80
    external = 8080
  }
  networks_advanced {
    name = docker_network.my_network.name
  }
}

resource "docker_image" "custom_app" {
  name          = "custom_app"
  build_context = "."
  dockerfile    = "Dockerfile"
}

resource "docker_container" "app" {
  name  = "app"
  image = docker_image.custom_app.latest
  ports {
    internal = 5000
    external = 5000
  }
  environment = ["DEBUG=True"]
  depends_on  = [docker_container.nginx]
  networks_advanced {
    name = docker_network.my_network.name
  }
}

resource "docker_container" "db" {
  name  = "db"
  image = "postgres:latest"
  environment = {
    POSTGRES_DB       = "mydatabase"
    POSTGRES_USER     = "myuser"
    POSTGRES_PASSWORD = "mypassword"
  }
  networks_advanced {
    name = docker_network.my_network.name
  }
}

output "app_container_ip" {
  value = docker_container.app.networks_advanced[0].ipv4_address
}
