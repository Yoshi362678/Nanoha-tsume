// 詰将棋エンジン コンソールテスト
// ブラウザで Nanoha-tsume.html を開いた後、F12 でコンソールを開いて以下を実行

console.log('=== 詰将棋エンジンテスト開始 ===');

// Test 1: 最も簡単な1手詰め
console.log('\n--- Test 1: 簡単な1手詰め ---');
engine.decodePosition("△４一玉 ▲３一飛");
console.log('盤面セット完了');

const startTime1 = Date.now();
engine.solveTsume();
const elapsed1 = Date.now() - startTime1;
console.log('実行時間:', elapsed1 + 'ms');
console.log('期待解: ▲３一飛成');

// Wait a moment, then test the problematic case
setTimeout(() => {
    console.log('\n--- Test 2: 以前問題のあったケース ---');
    engine.decodePosition("△５一玉 ▲６二金 ▲５二金");
    console.log('盤面セット完了');
    
    const startTime2 = Date.now();
    engine.solveTsume();
    const elapsed2 = Date.now() - startTime2;
    console.log('実行時間:', elapsed2 + 'ms');
    console.log('期待解: ▲４二金');
}, 2000);

console.log('\n=== 上記のテストをブラウザコンソールで実行してください ===');