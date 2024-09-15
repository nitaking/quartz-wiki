---
draft: true
tags:
  - evergreen
---
## 要望

#### ArcのSide Menuが開いている状態でもPC判定されたい

Zoom 100% & Side Menuが開いている状態はPC（Desktop）判定されたい。
viewportで判定されていないのか？
Explorerは表示されていたい・・・。（Zoom 90%なら表示される）

![[CleanShot 2024-09-16 at 02.56.21@2x.png]]
## Explorer
### 

```diff
- filterFn: filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
- mapFn: undefined,
+ filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
+ // mapFn: undefined,

```

```zsh
 Failed to emit from plugin `ContentPage`: mapFn is not a function
     at _FileNode.map (../components/ExplorerNode.tsx:119:5)
     at constructFileTree (../components/Explorer.tsx:60:20)
     at Object.call (../components/Explorer.tsx:84:7)
```