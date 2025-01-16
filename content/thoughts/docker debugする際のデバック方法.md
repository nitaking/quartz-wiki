---
tags:
  - docker
  - debug
---
### **デバッグ方法**

もしビルド中にまだ問題が発生する場合、以下の方法で詳細な情報を取得します。

1. **詳細なビルドログの取得**:
    
    ```shell
    docker build --no-cache --progress=plain -t your-image-name .
    
    ```
    

- **特定のRUNコマンドのテスト**: 問題のあるRUNコマンドを個別にテストします。例えば、`pecl install`コマンドを分割して実行し、どのステップでエラーが発生するか確認します。
    
- **コンテナ内での手動実行**:
    
    ```shell
    docker run -it your-image-name sh
    ```