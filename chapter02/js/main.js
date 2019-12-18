enchant();

window.onload = function(){
	
	//ゲームオブジェクトを作成
	core = new Core(320, 320);

	//ゲーム初期化処理

	//fps(1秒あたりの画面の描画回数)を設定(省略時は「30」)
	core.fps = 16;

	// ゲームで使用する画像ファイルを指定
	core.preload('./img/betty.png');

	// ファイルのプリロードが完了したときに実行される関数
	core.onload = function() {

	}

	// ゲームをスタート
	core.start();
}