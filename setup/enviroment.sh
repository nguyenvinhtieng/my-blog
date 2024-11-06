# Setup enviroment on the server Ubuntu: NodeJs, Nginx, MongoDB, PM2, Redis and Certbot

# Update and upgrade
sudo apt-get update
sudo apt-get upgrade

# Install NodeJs v21.x
curl -sL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt-get install -y nodejs


# Install Nginx
sudo apt-get install nginx

# Install MongoDB
sudo apt-get install -y mongodb


# Install PM2
sudo npm install pm2 -g

# Install Redis
sudo apt-get install redis-server

# Install Certbot
sudo apt-get install certbot python3-certbot-nginx
