module.exports = {
  apps: [
    {
      name: 'tecai-backend',
      script: './index.js',
      cwd: '/var/www/www-root/data/www/tecai.ru/server',
      env: {
        PORT: 3004,
      },
      max_memory_restart: '256M',
      autorestart: true,
    },
  ],
};
