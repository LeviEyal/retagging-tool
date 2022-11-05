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
			ref: "origin/without-turborepo",
			repo: "https://github.com/LeviEyal/retagging-tool",
      path: "home/st-admin/retagging-tool",
      "pre-setup": "echo 'This is a pre-setup command'",
			"post-deploy":
				"pm2 reload ecosystem.config.js --env production",
      "post-setup": "cd api && npm install && cd .. && cd client && npm install && cd .."
		},
	},
};
