module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "../env",
        env: {
          PYTHONUTF8: "1",
          HF_HUB_ENABLE_HF_TRANSFER: "0"
        },
        path: "app/ui",
        message: [
          "npm run start",
        ],
        on: [{
          // Next.js prints "Local:" after it has bound. Do not match the earlier
          // "AI Toolkit UI: http://localhost:..." line, which is logged before listen().
          event: "/Local:\\s+(http:\\/\\/[0-9a-zA-Z.]+:[0-9]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
