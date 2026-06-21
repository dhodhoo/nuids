# Enable rewrite module for CodeIgniter clean URLs
RUN a2enmod rewrite

# Set document root to /var/www/html (already default for php:8.3-apache)
# CI3's .htaccess handles URL rewriting
