module.exports = {
	apps: [
    {
      name: 'retagging-client',
			script: "npm run dev:client",
      env: {
        "NODE_ENV": "development",
        "SERVER_URL": "http://localhost:7005",
      }
		},
    {
      name: 'retagging-server',
      script: "npm run dev:server",
      watch: "./api",
      env: {
        "PORT": 7005,
        "NODE_ENV": "development",
      }
		},
	],
	deploy: {
		production: {
			user: "st-admin",
			host: "192.168.29.125",
			ref: "origin/master",
			repo: "GIT_REPOSITORY",
			path: "DESTINATION_PATH",
			"pre-deploy-local": "",
			"post-deploy":
				"npm install && pm2 reload ecosystem.config.js --env production",
			"pre-setup": "",
		},
	},
};
