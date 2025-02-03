---
tags:
  - debug
---
> ## **🛠 追加のデバッグ方法**
> 
> もし修正後もエラーが出る場合、次の方法でどこが問題か調査できます。
> 
> ### **1. `docker-compose run` でデバッグ**
> 
> sh
> 
> コピーする編集する
> 
> `docker-compose run --rm app sh`
> 
> その中で `docker-php-ext-enable` を手動で試す：
> 
> sh
> 
> コピーする編集する
> 
> `docker-php-ext-enable redis xdebug imagick php -m | grep -E 'redis|xdebug|imagick'`
> 
> ✅ 出力に `redis`, `xdebug`, `imagick` が表示されていればOK
> 
> ### **2. `docker-php-ext-install` のエラーを調査**
> 
> sh
> 
> コピーする編集する
> 
> `docker-compose run --rm app sh -c "docker-php-ext-install opcache bcmath pdo_mysql gd exif zip"`
> 
> もし `Already enabled` のようなメッセージが出たら、そのモジュールは削除してもOK。
> 
> ---
> 
> ## **🚀 まとめ**
> 
> ✅ **`docker-php-ext-enable` の実行を `php -m` で制御**  
> ✅ **`pecl install` ではバージョン指定を明示**  
> ✅ **`docker-php-ext-install` から不要なモジュールを削除**  
> ✅ **コンテナに入って `php -m` で有効なモジュールを確認**
> 
> この修正で `docker-compose build` が成功するはずです！💪🔥
> 
![[container-in-debug.png]]