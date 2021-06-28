module.exports = {
  apps: [
    {
      name: "SMART_CODE_HUB_API",
      script: "./dist/smartcodehubapi.js",

      // Options referenc   e: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances : "max",
      exec_mode : "cluster",
      autorestart: true,
      max_memory_restart: "1G",
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
		production: {
			user: "root",
			host: "142.93.220.111",
			ref: "origin/master",
			repo: "git@github.com:smartcodehubnext/Smartcodehubapi.git",
			path: "root/smartcodehub/smartapi",
			"post-deploy": "npm install && pm2 reload ecosystem.config.js --env production"
		}
	}
};
