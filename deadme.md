# Yepas DEMO
# BUILD IMAGE
docker build -t demo-yepas .

# Run Container
docker run -d \
  --name demo-yepas \
  -p 8085:80 \
  demo-yepas