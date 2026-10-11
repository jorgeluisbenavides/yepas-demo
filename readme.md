# Yepas DEMO
# BUILD IMAGE
```bash
docker build -t demo-yepas .
```

# Run Container
```bash
docker run -d \
  --name demo-yepas \
  -p 8085:80 \
  demo-yepas
  ```