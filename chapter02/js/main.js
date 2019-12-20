enchant();

window.onload = function(){
	
	const canvas = {
		width: 320,
		height: 320
	}

	const player_s = {
		w: 48,
		h: 48
	}

	const hana = {
		sx : 0,
		sy : 96,
		sw : 126,
		sh : 64,
		dx : 64,
		dy : 64,
		dw : 126,
		dh : 64 
	}
	//ゲームオブジェクトを作成
	core = new Core(320, 320);

	//ゲーム初期化処理

	//fps(1秒あたりの画面の描画回数)を設定(省略時は「30」)
	core.fps = 16;

	// bettyのsrcを指定
	betty = './img/betty.png'
	flowers = './img/flowers.png'

	// ゲームで使用する画像ファイルをプリロードするには「Core」オブジェクトの「preload」メソッド
	// (「core.preload」)を使います。引数には、画像ファイルのパスを指定します。
	// 複数の場合には、「,」で区切って列挙します。
	// ゲームで使用する画像ファイルを指定
	core.preload(betty, flowers);

	// ファイルのプリロードが完了したときに実行される関数
	core.onload = function() {
		// スプライトを作成するには、まず「Sprite」コンストラクタでオブジェクトを生成します。
		// 引数には、スプライトの幅と高さを指定します。次に「image」プロパティに表示する画像を「Core」
		// オブジェクトの「assets」プロパティ(「core.assets」プロパティ)で取得して設定します。
		// スプライトの画像は、指定した高さと幅の「フレーム」という領域で分割されます。どのフレーム
		// を表示するかは「frame」プロパティに番号(インデックス)で指定します。フレームの番号は
		// 左上から右下に「0」から順に数えます。
		// 例えば、サンプルでは192X192ピクセルの画像(betty.png)を48X48の領域で分割しているので
		// フレーム番号は次のようになります。
		// [0][1][2][3]
		// [4][5][6][7]
		// [8][9][10][11]
		// [12][13][14][15]
		// ＊各番号はスプライトのフレーム番号に相応します！

		// スプライトを作成する
		// frame : 表示するフレームの番号
		// image : 表示する画像
		// rotation : 回転角度
		// scaleX : x方向の倍率
		// scaleY : y方向の倍率
		// x : x座標
		// y : y座標

		var player = new Sprite(player_s.w, player_s.h);
		// スプライトの主なプロパティは、次の通りです。
		
		// ラベルを作成する
		var infoLabel = new Label('enchant.js サンプル')

		// 画像の任意の範囲を切り取って、新しい画像を作成するには、「Surface」オブジェクト(以下、サーフィス)を使います。

		// サーフィスを作成するには、まず、「Surface」コンストラクタでオブジェクトを生成します。引数には、幅と高さを指定します。
		// サーフィスを作成する
		var image = new Surface(canvas.width, canvas.height);
		// 「flowers.png」の(0,96)の位置から幅「126」ピクセル、高さ「64」ピクセルの領域を
		// サーフィスの(64, 64)の位置に幅「126」ピクセル、高さ「64」ピクセルで描画する
		
		// 次に、「draw」メソッド引数で指定した画像「サーフィス」を描画します。「draw」メソッドの引数の指定方法には、次の四つがあります。
		// image.draw(image) : imageをサーフィスの(0,0)の位置に描画する
		// image.draw(image, dx, dy) : imageをサーフィスの(dx, dy)の位置に描画する
		// image.draw(image, dx, dy, dw, dh) : imageをサーフィスの(dx, dy)の位置に幅(dw)ピクセル、高さ(dh)ピクセルで描画する
		// image.draw(image, sw, sy, sw, sh, dx, dy, dw, dh) : imageの(sx,sy)の位置から幅(sw),高さ(sh)ピクセルの領域を、サーフィスの(dx, dy)の位置に幅dw,高さdwピクセルで描画します。
		image.draw(core.assets[flowers], hana.sx, hana.sy, hana.sw, hana.sh, hana.dx, hana.dy, hana.dw, hana.dh)

		// サーフィスを表示するためのスプライト（背景）を作成します。
		var bg = new Sprite(canvas.width, canvas.height)
		// スプライトにサーフィスを設定する
		bg.image = image;

		// ルートシーンにスプライトを追加
		core.rootScene.addChild(bg);

		// スプライトで表示する画像を設定する
		
		player.image = core.assets[betty]
		// 表示するフレームの番号を設定する。
		player.frame = 3;
		// 表示位置のx座標を設定する
		player.x = 120;
		//表示位置のy座標を設定する
		player.tick = 0;
		// フレーム数をカウントするプロパティを追加

		infoLabel.x = 16;
		// 表示位置のx座標を設定する
		infoLabel.y = 0;
		// 表示位置のy座標を設定する	
		infoLabel.color = '#00f';
		// 文字色を設定する
		infoLabel.font = '14px sens-serif';
		// フォントサイズとフォントの種類を設定する
		


		// スプライトを実際の画面上に表示するには、表示オブジェクトツリーにスプライトを追加しなければなりません。
		// ここでは、ルート氏＾ンにスプライトを追加します。
		// ルートシーンにスプライトを追加するには「Core」オブジェクトの「rootScene」プロパティでルートシーンを参照し、
		// 「addChild」メソッドを実行します。「addChild」メソッドの引数は、スプライトを指定します。
		//rootSceneにスプライトを追加します。
		core.rootScene.addChild(player);

		// キー入力を検出するには、「Core」オブジェクトの「input」プロパティを使います。
		// enchant.jsのサポートする入力は、「左」「右」「上」「下」「a」「b」ボタン６つです。
		// それぞれのボタンにプロパティとキーは以下の通りです。
		// core.input.left : 左キー押下で反応
		// core.input.right : 右キー押下で反応
		// core.input.up : 上キー押下で反応
		// core.input.down : 下キー押下で反応
		// core.input.a : 指定した特定のキーを押下で反応
		// core.input.b : 指定した特定のキーを押下で反応
		player.addEventListener(Event.ENTER_FRAME, function(e) {
			// スプライトをアニメーション表示する際のフレームの切り替え順番は、画像により異なります。
			// ここで使用しているキャラクターの画像で歩行アニメーションを表示するには、次の順番でフレームを切り替える必要があります。
			// 左：1,5,9,13
			// 右：3,7,11,15
			// 上：2,6,10,14
			// 下：0,4,8,12
			// 順番の通り切り替えるには、まず、フレーム数をカウントする「tick」プロパティを追加します。
			// このプロパティは、移動操作を行った際にフレーム数をカウントします。なお、「tick」プロパティは独自に定義したプロパティで
			// ゲーム自体のフレーム数(「core.frame」プロパティ)とは異なるので注意してください。

			// 左ボタンが押されたら、スプライトをx方向に「-4」ピクセル移動
			if(core.input.left) {
				if(this.x> 0) {
					this.x -=4;
					// スプライトのフレーム番号を切り替えてアニメーションを表示する
					this.frame = this.tick%4*4+1
					// フレーム数をインクリメントする
					this.tick ++;
				}
			}

			// 右ボタンが押されたら、スプライトをy方向に「4」ピクセル移動
			if(core.input.right) {
				if(this.x + player_s.w< canvas.width) {
					this.x += 4;
					this.frame = this.tick%4*4+3
					this.tick ++;
				}
			}

			// 上ボタンが押されたら、スプライトをy方向に「-4」ピクセル移動
			if(core.input.up) {
				if(this.y > 0) {
					this.y -= 4
					this.frame = this.tick%4*4+2
					this.tick ++;
				}
			}

			// 下ボタンが押されたら、スプライトをy方向に「4」ピクセル移動
			if(core.input.down) {
				if(this.y + player_s.h < canvas.height) {
					this.y += 4
					this.frame = this.tick%4*4
					this.tick ++;
				}
			}
		});

		// 「touchmove」イベントが発生したときに実行するリスナを登録する
		// このタッチイベントはキャラクタに付いてるのでマップをドラッグしてもなにも起こらない
		player.addEventListener(Event.TOUCH_MOVE,function(e) {
			// イベントリスナを登録するには、「EventTarget」オブジェクトの「addEventListener」メソッドを使います。
			// 引数には、イベントタイプとリスナ(イベント発生時に実行する関数)を指定します。
			// ここでは、スプライトの「TOUCH_MOVE」イベントに対するリストを登録しています。
			// イベントの種類に対しては http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Event.htmlを参考にする


			// スプライトをタッチして移動した場合、またはドラッグした場合に移動する。
			this.x = e.x - this.width/2;
			this.y = e.y - this.height/2;
		});

		

		// rootSceneにラベルを追加する
		core.rootScene.addChild(infoLabel);
	}

	// ゲームをスタート
	core.start();
}