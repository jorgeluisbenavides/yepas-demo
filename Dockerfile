FROM nginx:alpine

# Elimina la página por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia nuestra página demo
COPY index.html /usr/share/nginx/html/index.html

# Nginx escucha en el puerto 80 dentro del contenedor
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]