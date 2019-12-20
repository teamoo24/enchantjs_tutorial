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
	//ゲームオブジェクトを作成
	core = new Core(320, 320);

	//ゲーム初期化処理

	//fps(1秒あたりの画面の描画回数)を設定(省略時は「30」)
	core.fps = 16;

	// bettyのsrcを指定
	betty = './img/betty.png'

	// ゲームで使用する画像ファイルをプリロードするには「Core」オブジェクトの「preload」メソッド
	// (「core.preload」)を使います。引数には、画像ファイルのパスを指定します。
	// 複数の場合には、「,」で区切って列挙します。
	// ゲームで使用する画像ファイルを指定
	core.preload(betty);

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
		


		// スプライトで表示する画像を設定する
		
		player.image = core.assets[betty]
		// 表示するフレームの番号を設定する。
		player.frame = 3;
		// 表示位置のx座標を設定する
		player.x = 120;
		//表示位置のy座標を設定する



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
			// 左ボタンが押されたら、スプライトをx方向に「-4」ピクセル移動
			if(core.input.left) {
				if(this.x> 0) {
					this.x -=4;
				}
			}

			// 右ボタンが押されたら、スプライトをy方向に「4」ピクセル移動
			if(core.input.right) {
				if(this.x + player_s.w< canvas.width) {
					this.x += 4;
				}
			}

			// 上ボタンが押されたら、スプライトをy方向に「-4」ピクセル移動
			if(core.input.up) {
				if(this.y > 0) {
					this.y -= 4
				}
			}

			// 下ボタンが押されたら、スプライトをy方向に「4」ピクセル移動
			if(core.input.down) {
				if(this.y + player_s.h < canvas.height) {
					this.y += 4
				}
			}
		});

		// 「touchmove」イベントが発生したときに実行するリスナを登録する
		player.addEventListener("touchmove",function(e) {
			this.x = e.x - this.width/2;
			this.y = e.y - this.height/2;
		});
	}

	// ゲームをスタート
	core.start();
}