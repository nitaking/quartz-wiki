---
tags:
  - web_framework
---
## Concept

他のWebフレームワークが[[Hydration]]しているのに対して、qwik[[Resumable]] という形で[[Hydration]]をしない。

> Resumability is about pausing execution on the server and resuming execution on the client without having to replay and download all of the application logic.
> 再開機能とは、アプリケーション ロジックをすべて再生してダウンロードすることなく、サーバー上で実行を一時停止し、クライアント上で実行を再開することです。
> 
> [Think Qwik | Concepts 📚](https://qwik.dev/docs/concepts/think-qwik/)

## 他のフレームワークとの比較 テキスト[^1] 

| 特徴/フレームワーク | Qwik   | Solid.js | Next.js    | React      | Angular    |
| ---------- | ------ | -------- | ---------- | ---------- | ---------- |
| 初期ロード速度    | 非常に高速  | 高速       | 中程度        | 遅い         | 非常に遅い      |
| ハイドレーション   | 不要     | 必要       | 必要         | 必要         | 必要         |
| リアクティビティ   | DOMレベル | DOMレベル   | コンポーネントレベル | コンポーネントレベル | コンポーネントレベル |
| バンドルサイズ    | 小さい    | 小さい      | 大きい        | 大きい        | 非常に大きい     |
| エコシステム     | 発展中    | 発展中      | 成熟         | 成熟         | 成熟         |

[^1]: perplexityによるまとめ。未検証。 https://www.perplexity.ai/search/https-qwik-dev-docs-qwiknituit-iGiQbdYrQKqRc5pDZLKlOw