---
tags:
  - posts
---
「**Arrange, Act, Assert（アレンジ、アクト、アサート）**」

---

TDD（テスト駆動開発）における3工程のワードとして、おそらく「**Arrange, Act, Assert（アレンジ、アクト、アサート）**」のことを指していると思われます。このパターンは、テストケースを構築する際の基本的な流れを示しており、以下の3つのステップで構成されています。

### 1. Arrange（アレンジ）

**準備段階**です。テスト対象となるコードを実行するために必要なオブジェクトの生成や初期状態の設定を行います。このステップでは、テスト環境を整えるためのすべての準備を行います。

```php
// 例: テスト対象のクラスと必要なモックを準備
$redisMock = $this->createMock(Redis::class);
$repository = new Repository($redisMock);
$keyValues = [
    [
        'id' => 1,
        'rankings' => ['rank1', 'rank2']
    ],
    [
        'id' => 2,
        'rankings' => ['rankA', 'rankB']
    ],
];
```

### 2. Act（アクト）

**実行段階**です。テスト対象となるメソッドや関数を実際に呼び出します。このステップでは、準備した環境下でコードを実行し、その動作を確認します。

```php
// 例: テスト対象のメソッドを実行
$repository->createCache($keyValues);
```

### 3. Assert（アサート）

**検証段階**です。実行結果が期待通りであることを確認します。ここでは、結果が正しいかどうかをアサーション（断言）を使って検証します。

```php
// 例: Redisのsetメソッドが正しく呼び出されたかを検証
$redisMock->expects($this->exactly(2))
    ->method('set')
    ->withConsecutive(
        [
            $this->equalTo('id_1_cache_key'),
            $this->equalTo(json_encode(['rank1', 'rank2']))
        ],
        [
            $this->equalTo('id_2_cache_key'),
            $this->equalTo(json_encode(['rankA', 'rankB']))
        ]
    )
    ->willReturn(true);
```

### まとめ

**Arrange, Act, Assert（アレンジ、アクト、アサート）**は、テストを書く際の基本的なフレームワークであり、以下のように活用されます：

1. **Arrange（アレンジ）**: テストの準備を行う。
    
2. **Act（アクト）**: テスト対象のコードを実行する。
    
3. **Assert（アサート）**: 結果を検証する。
    

このパターンを遵守することで、テストコードが読みやすく、メンテナンスしやすくなります。また、テストの意図が明確になり、バグの早期発見やリファクタリング時の安全性向上にも寄与します。

---

**参考資料**:

- [PHPUnit Documentation: Test Structure](https://phpunit.de/documentation.html)
    
- [Test-Driven Development (TDD) Explained](https://en.wikipedia.org/wiki/Test-driven_development)
    

もし他にも具体的な質問や疑問があれば、ぜひお知らせください！