server {
    listen 443 ssl;
    server_name proyecto.pablitoda.com;

    ssl_certificate /etc/certs/pablitoda.com.pem;
    ssl_certificate_key /etc/certs/pablitoda.com.key;

    root /var/www/proyecto/browser;
    index index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuración adicional
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Proteger archivos ocultos
    location ~ /\.ht {
        deny all;
    }

    # Compresión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Conexiones y consultas al backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Limitar métodos HTTP
    if ($request_method !~ ^(GET|HEAD|POST|PATCH|DELETE)$) {
        return 405;
    }
}

server {
    listen 80;
    server_name proyecto.pablitoda.com;
    location / {
        return 301 https://proyecto.pablitoda.com;
    }
}
