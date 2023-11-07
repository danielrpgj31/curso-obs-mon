module.exports = {
  apps: [
    {
      name: "app",
      script: "fixLeak.js",
      //node_args: ["--trace_gc"],
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
