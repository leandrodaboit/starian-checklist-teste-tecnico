FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl libpng-dev sqlite3 libsqlite3-dev \
    && docker-php-ext-install zip pdo pdo_mysql pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /backend

COPY . .

RUN composer install

CMD ["php-fpm"]
