---
tags:
  - posts
  - rpc
  - hono
  - cors
---
honoで`hono/client`を利用したRPCモードでのクライアント通信を実装していたところ、CORS対応にて調べた内容。

#### hono: CORS設定

> https://hono.dev/docs/middleware/builtin/cors

```ts
const authClient = hc<SomeType>("/api/auth/", {
    headers: {} // You can already set headers!
    credentials: "include",
});
```

その場合のclientでは`init: {}`にてcredentials設定を行う。

```ts
const api = hc('api/auth', {
  init: {
    credentials: 'include',
  },
})
```

> https://github.com/orgs/honojs/discussions/2291