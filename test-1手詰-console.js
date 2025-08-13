// 1手詰テスト - コンソールで実行するスクリプト
// Nanoha-tsume.htmlをブラウザで開いてから、このスクリプトをコンソールで実行

// 問題1：頭金のテスト
function test1手詰() {
    console.log('=== 1手詰テスト開始 ===');
    console.log('問題: 先手▲５三歩、後手△５一玉、持駒：金');
    console.log('正解: ▲５二金打');
    
    // エンジンのインスタンスを取得（ページのグローバル変数として存在するはず）
    if (typeof engine === 'undefined') {
        console.error('エンジンが見つかりません。Nanoha-tsume.htmlを開いてください。');
        return;
    }
    
    // 盤面をクリア
    engine.clearBoard();
    
    // 駒を配置
    // ５三歩（先手）
    const [row53, col53] = engine.humanToInternal('５三');
    engine.board[row53][col53] = { piece: '歩', side: 'sente' };
    
    // ５一玉（後手）
    const [row51, col51] = engine.humanToInternal('５一');
    engine.board[row51][col51] = { piece: '玉', side: 'gote' };
    
    // 持駒を設定
    engine.mochiGoma.sente = { '金': 1 };
    engine.mochiGoma.gote = {};
    
    // 盤面を表示
    engine.displayBoard();
    
    console.log('盤面設定完了。詰みを解く...');
    
    // デバッグモードをオン
    engine.debugMode = true;
    
    // 探索開始時刻を記録
    const startTime = Date.now();
    
    // 1手詰めなので深さ1で探索
    engine.hashTable.clear();
    engine.nodeCount = 0;
    engine.searchStartTime = Date.now();
    
    const result = engine.search(1, true);
    
    const elapsed = Date.now() - startTime;
    
    if (result && result.length > 0) {
        const moveStr = result[0];
        console.log(`結果: ${moveStr}`);
        console.log(`探索時間: ${elapsed}ms`);
        console.log(`探索ノード数: ${engine.nodeCount}`);
        
        if (moveStr === '▲５二金打') {
            console.log('✅ 正解！');
            return true;
        } else {
            console.error(`❌ 不正解: ${moveStr} (正解: ▲５二金打)`);
            return false;
        }
    } else {
        console.error('❌ 詰みが見つかりませんでした');
        console.log(`探索時間: ${elapsed}ms`);
        console.log(`探索ノード数: ${engine.nodeCount}`);
        return false;
    }
}

// 詳細なデバッグ情報付きテスト
function test1手詰Debug() {
    console.log('=== 詳細デバッグモード ===');
    
    if (typeof engine === 'undefined') {
        console.error('エンジンが見つかりません');
        return;
    }
    
    // 盤面設定
    engine.clearBoard();
    const [row53, col53] = engine.humanToInternal('５三');
    engine.board[row53][col53] = { piece: '歩', side: 'sente' };
    const [row51, col51] = engine.humanToInternal('５一');
    engine.board[row51][col51] = { piece: '玉', side: 'gote' };
    engine.mochiGoma.sente = { '金': 1 };
    
    // 王手可能な手を生成
    console.log('--- 王手可能な手を生成 ---');
    const checks = engine.generateChecks();
    console.log(`生成された王手: ${checks.length}手`);
    
    checks.forEach((move, index) => {
        const moveStr = engine.formatMove(move);
        console.log(`  ${index + 1}. ${moveStr}`);
        
        // この手で本当に王手か確認
        const backup = engine.makeMove(move);
        const isCheck = engine.isCheck('gote');
        console.log(`     王手判定: ${isCheck ? '○' : '×'}`);
        
        if (isCheck) {
            // 後手の応手を確認
            const evasions = engine.generateEvasions();
            console.log(`     後手の応手: ${evasions.length}手`);
            
            if (evasions.length === 0) {
                console.log(`     => 詰み！`);
            } else {
                evasions.forEach(ev => {
                    console.log(`        - ${engine.formatMove(ev)}`);
                });
            }
        }
        
        engine.unmakeMove(move, backup);
    });
}

// テスト実行
console.log('test1手詰() または test1手詰Debug() を実行してください');