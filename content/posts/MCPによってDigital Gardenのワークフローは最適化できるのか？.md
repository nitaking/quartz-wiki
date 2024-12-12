---
tags:
  - claude
  - generative_ai
---
[[MCP(Model Context Protocol)]]を触るタイミングで、これがローカルファイルを中心としたワークフローに対してどういったアプローチが可能になるかを検討します。

## 試すこと
はじめに、[[MCP(Model Context Protocol)]]の [Quickstart](https://modelcontextprotocol.io/quickstart) を触ってみましょう。


node設定について
https://note.com/npaka/n/n4216cfc51794

の通り

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "weather_service": {
      "command": "/path/to/node",
      "args": [
        "/path/to/weather-server/build/index.js"
      ]
    }
  }
}
```

`node`のpathには`which node`のpathを設定すれば動作する。

![[mcp_quickstart_1.png]]