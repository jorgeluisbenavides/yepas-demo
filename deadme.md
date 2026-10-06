# Yepas DEMO
BUILD IMAGE
docker build -t demo-nginx .

Run Container
docker run -d \
  --name demo-nginx \
  -p 8085:80 \
  demo-nginx