# Base image me nginx use karenge static website serve karne ke liye
FROM nginx:alpine

# Copy index.html ko default nginx folder me copy karenge
COPY index.html /usr/share/nginx/html/index.html

# Nginx by default port 80 pe run karta hai
EXPOSE 80

# CMD default hai, so likhna optional hai
CMD ["nginx", "-g", "daemon off;"]

