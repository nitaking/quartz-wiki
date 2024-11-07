---
tags:
  - mental_model
---
# Life
- つながり
	- 家族や友人、人とのつながりを大事にしたい。
	- これまでの人生で、つながりによって支えられてきた。これからもつながりを大事に。
- 笑顔、楽しさ
	- 笑顔がなかった日々は地獄だったので、繰り返したくない
	- 辛い状態なら笑顔に近づけるように手助けしたい
- 自然体、ありのまま
	- 相手のありのままを受け入れる自分が好き。
	- 自分がありのままで接し、相手もそれをを理解してくれることが嬉しい。
- 人間らしく
- 誠実である、誠実になる
	- 自分に対しても、他者に対しても誠実であることを重視していることがわかってきた。
	- 理想主義的な考えを持っていると思う。自分を好きになるためにと考えると、好きな自分は誠実であるシーンが多かったのだと思う。
- 周りへの関心
	- 周囲の状況に目を向けがちで、特に誰がどんな感情を抱いているかを理解したい思いが強いです。
- やらない後悔よりやった後悔
	- 尻込みしているのが不安や恐怖の場合、チャレンジした方がよかった事が多い。
	- やりたい気持ちが少しでもあるならやった後悔のほうがマシ
- 考えすぎたら体を動かす
- 楽しむ姿勢
	- 「辛いな、キツイな」と思ったら楽しむ余地を探す。楽しもうとした結果に楽しい結果がある。
- 服は、迷ったら買わない
	- ガジェットは迷ったら買うかもしれない
	- 原理原則を持っていることで選択コストを減らすことが大事
## 引用

> *ヴィクトール・フランクル：「人生の最後の自由は、どんな状況でも自分の態度を選ぶ自由である」*

> *ニーチェ： 「そのことを殺さないものは、私をより強くする」*

> ヘレン・ケラー： 「人生は大胆な冒険か、それとも何もないかのどちらかです」

---
# Tech

- 特定のコミュニティの流行りに引っ張られないように気をつけたい。グローバルベースでの流行りをウォッチしていたい。
- 「技術を使ってなにかする」ではなく、「○○をするために技術を使う・選ぶ」
- 
## API First / The API Mandate

> 1. すべてのチームは、今後サービスインターフェースを通じてデータや機能を公開する
> 2. 各チームはこのインタフェースを通じて相互に通信しなければいけない
> 5. すべてのサービスインタフェースは例外なく、外部か可能なように1から設計しなければいけない。チームは外部の開発者にインタフェースを公開できるように計画・設計しなければいけない。例外はない

この概念を支持しています。
マイクロサービスを検討有無にかかわらず、最初からインタフェース非公開前提でDBから直接アクセスした設計では、インフラ層が密結合になってしまい、改修コストが跳ね上がった経験があります。
また、インタフェースが公開できる状態というのはリポジトリ・プロダクトのドキュメンテーションという点においても正しくワークしている状態であり、インタフェースが公開できない状態は荒れているシーンが多々あります。
#### 参考
- [The API Mandate - Install API Thinking at your Company – API-University](https://api-university.com/blog/the-api-mandate/)
- [API Mandate: How Jeff Bezos' memo changed software forever](https://konghq.com/blog/enterprise/api-mandate)

## OOP way Frontend DDDの相性の悪さ

OOP（オブジェクト志向）とReactは相性が悪く、OOPでのDDDはReactに導入する場合は発生するコストやリスクを踏まえて導入を決めます。

ReactはRe-renderingの仕組みがオブジェクトの場合、参照等価です。
> ※参照先を確認中です。Shallow Equalとして認識しています。Deep Equalをしている場合、同一インスタンスでも変更があったプロパティをチェックした上で差分を検知できますが、パフォーマンス上ReactはShallow Equalを採用しています。

フロントにおけるユーザーは大抵一人であり、Storeで`User`Storeを管理すると、OOP wayではシングルトンでの実装となります。そうなると、深いネストを持った同一インスタンスがStoreに保存される形となり、Renderingの条件と噛み合いにくくなります。

その解決策としては [Immer](https://immerjs.github.io/immer/) を使って immutable として取り扱うことです。Zustandでは [Immer middleware](https://zustand.docs.pmnd.rs/integrations/immer-middleware) が提供されており、相性がよいです。

個人的には言語仕様として相性が悪いものは採用しないほうがシンプルであると考えていますが、その前提でOOP/DDDを採用するなら良いと思います。

逆に、関数型としての[[DDD]]や Immutable な取り回しを前提としたものも良いと考えています。が、DDDにおけるビジネスロジックはバックエンドに集約させる方が良いと考えており、Frontend（React）もプレゼンテーション層の一部のViewであると捉えるのが今の支持です。

昨今はAPI RequestのCache戦略として [[TanStack Query]] や [[SWR]] などでGraphQLのように、バックエンドのデータストアをクライアントのStoreとして扱えるようなキャッシュ機構が増えています。

極力ViewとしてのReactアプリケーションと割り切ると、クライアントアプリケーション内でRoot的なStore管理をする必要が減り、Request CacheとLocal Stateの最小２つで管理することができうると考えています。

- https://legacy.reactjs.org/docs/shallow-compare.html
- [props がオブジェクト・配列・関数の場合にコンポーネントが再レンダーされる](https://ja.react.dev/reference/react/memo#my-component-rerenders-when-a-prop-is-an-object-or-array "Link for props がオブジェクト・配列・関数の場合にコンポーネントが再レンダーされる")
- [DDD and react : r/reactjs](https://www.reddit.com/r/reactjs/comments/1ar0g1e/ddd_and_react/)

## KISS（Keep it Simple, Stupid）

> Keep it simple stupid.（シンプルで愚鈍にする）[^wiki]

過度な設計や過度な機能。例えば、ブログを書こうとしてブログサイトにこだわりすぎてしまう現象。
度々やってしまうが、システムにおいてもシンプルに、愚鈍にしておくことを選択肢にもち、よしとする。

過度に時間がかかっているときはKISSを思い出し、解決策とする。


[^wiki]: [KISSの原則 - Wikipedia](https://ja.wikipedia.org/wiki/KISS%E3%81%AE%E5%8E%9F%E5%89%87)

---

- Twelve-Factor App
	- [The Twelve-Factor App （日本語訳）](https://12factor.net/ja/)
	- [Creating cloud-native applications: 12-factor applications - IBM Developer](https://developer.ibm.com/articles/creating-a-12-factor-application-with-open-liberty/)
- Beyond the 12 factors
	- [Beyond the 12 factors: 15-factor cloud-native Java applications - IBM Developer](https://developer.ibm.com/articles/15-factor-applications/)

---
# Work

多くは引用です。

## 意思決定
### 正しい決断よりも早く強い決断
![[fast_decision.png]]
正しい判断は存在しない。例えば技術選定に正しさは存在しない。大事なのはどんな意思決定をするか。意思決定に必要な判断材料・判断軸を整理し、チームとして前に進むことが大事。

