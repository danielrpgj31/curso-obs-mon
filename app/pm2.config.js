module.exports = {
  apps: [
    {
      name: "app",
      script: "index.js",
      node_args: ["--trace_gc"],
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
