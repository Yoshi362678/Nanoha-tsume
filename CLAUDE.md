# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file web application that implements a **詰将棋エンジン** (Tsume Shogi Engine) called "なのは詰めアルゴリズム" (Nanoha Tsume Algorithm). It's a complete browser-based shogi puzzle solver written in HTML/CSS/JavaScript.

## Architecture

### Single-File Structure
- **Nanoha-tsume.html**: Contains the entire application with embedded CSS and JavaScript
- No external dependencies or build tools
- Self-contained web application that runs in any modern browser

### Core Components

#### 1. TsumeShogi Class (`Nanoha-tsume.html:442-1368`)
The main engine class that handles:
- **Board Representation**: 9x9 grid with piece positioning 
- **Move Generation**: Generates legal moves for all piece types
- **Search Algorithm**: Implements minimax search with alpha-beta pruning
- **Tsume Solving**: Specialized for mate-in-N problems

#### 2. Coordinate System (`Nanoha-tsume.html:421-439`)
- **Human Notation**: Uses traditional Japanese notation (９一, ８二, etc.)
- **Internal Coordinates**: 0-indexed [row, col] arrays
- Conversion functions: `humanToInternal()` and `internalToHuman()`

#### 3. Search Algorithm (`Nanoha-tsume.html:613-677`)
- **Iterative Deepening**: Searches incrementally deeper until mate found
- **Hash Table**: Prevents redundant position evaluation
- **Check/Evasion**: Alternates between forcing checks (sente) and evasions (gote)
- **Performance Limits**: Max 15 depth, 100k nodes to prevent hangs

#### 4. Piece Movement (`Nanoha-tsume.html:920-970`)
- **Direction Tables**: Defines movement patterns for each piece type
- **Promotion Logic**: Handles piece promotion in enemy territory
- **Drop Rules**: Validates piece drops with anti-repetition rules

## Key Features

### Position Management
- **Save/Load**: LocalStorage persistence for puzzle positions
- **Import/Export**: Text-based position encoding for sharing
- **Sample Problems**: Built-in example puzzles

### UI Components
- **Interactive Board**: Click-based piece placement
- **Piece Selection**: Choose piece type and side (sente/gote)
- **Move Display**: Shows solution sequence when mate found
- **Status Updates**: Real-time feedback on solving progress

## Usage

### Running the Application
Simply open `Nanoha-tsume.html` in a web browser - no server required.

### Setting Up Puzzles
1. Select piece type and side (先手/後手)
2. Click board squares to place pieces
3. Add 持ち駒 (pieces in hand) for sente if needed
4. Click "詰みを解く" to solve

### Development Notes
- No build process needed - direct file editing
- Browser developer tools for debugging
- localStorage for data persistence
- Responsive CSS for mobile support

## Common Tsume Rules
- **Sente (先手)**: Must give check with every move
- **Gote (後手)**: Must escape check if possible  
- **Mate Condition**: Gote has no legal moves to escape check
- **Piece Restrictions**: Only sente can have 持ち駒 (pieces in hand)

---

# 詰将棋エンジン（なのは詰めアルゴリズム）作業引継書

## 現在の実装状況

### 完成している機能：

✅ UI（駒配置、表示、操作）  
✅ 座標系（将棋標準表記: ５一玉など）  
✅ 基本的な詰将棋探索（反復深化＋ハッシュ表）  
✅ 飛び駒の移動（飛車・角・香車など）  
✅ 王手生成（盤上移動＋持駒打ち）  
✅ 王手回避（玉の移動＋王手駒を取る＋合駒）  
✅ 配置の保存・読込機能  

## 残課題と改善点

### 1. 詰み判定の精度向上
```javascript
// 現在の問題：一部の詰み/不詰みの判定が不正確
// 例：△２二玉 △２一銀 ▲４四龍の配置で誤判定の可能性
```

### 2. 合駒生成の完全実装
```javascript
// generateEvasions()内の合駒部分
// TODO: 持駒からの合駒打ちが未実装
// 現在は盤上の駒移動による合駒のみ
```

### 3. パフォーマンス最適化
```javascript
// 推奨事項：
// - 置換表のサイズ調整
// - 枝刈り（無駄な手の削減）
// - killer move heuristic等の導入
```

### 4. デバッグ推奨箇所
```javascript
// search()関数内の以下の部分を重点確認：
// 1. 王手判定: isCheck()
// 2. 詰み判定: 後手の全応手チェック
// 3. ハッシュ表の動作確認
```

## テストケース

```javascript
// 1手詰めテスト
test1 = "△５一玉 ▲６三金 ▲４三金";  // ▲５二金で詰み

// 3手詰めテスト  
test2 = "△５一玉 △４二歩 ▲２二飛 ▲持金1";  // ▲４一歩成→△６一玉→▲６二金打ち

// 不詰みテスト
test3 = "△２二玉 △２一銀 △２三歩 △１四歩 ▲４四龍 ▲５五角";  // 詰まない
```

## 開発環境セットアップ

### ファイル構成
- 単一HTMLファイル（inline CSS/JS）
- ローカルストレージ使用（配置保存）

### デバッグ方法
```javascript
// コンソールログを活用
console.log('探索深さ:', depth, '手番:', isSente ? '先手' : '後手');
console.log('生成された手:', moves.map(m => this.formatMove(m)));
```

## 注意事項
- 座標系は人間表記で統一（内部変換関数使用）
- 無限ループ対策（ノード数上限: 100,000）
- ブラウザ拡張機能によるエラーは無視可能

## 次のステップ推奨
1. 合駒生成の完全実装
2. 詰み判定のバグ修正
3. より複雑な詰将棋問題でのテスト
4. UIの改善（手順再生機能など）