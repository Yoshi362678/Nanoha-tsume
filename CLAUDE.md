# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file web application implementing a **詰将棋エンジン** (Tsume Shogi Engine) called "なのは詰めアルゴリズム" (Nanoha Tsume Algorithm). It's a complete browser-based shogi puzzle solver with no external dependencies.

## Commands

### Running and Testing
```bash
# Run the application - just open in browser
open Nanoha-tsume.html

# Run test files
open test_3move_fix.html
open test_aigoma_3te.html
```

### Development
- **Edit and Refresh**: Direct editing of `Nanoha-tsume.html` - changes visible on browser refresh
- **Debug Mode**: Toggle debug checkbox in UI for detailed logging
- **Console Testing**: Use browser DevTools console for direct engine testing

## Architecture

### Core Engine (`Nanoha-tsume.html`)

#### TsumeShogi Class (lines 449-1489)
Main engine implementing the solving algorithm:

```javascript
// Key methods:
solveTsume()        // Main entry point (line 558)
search()            // Minimax with alpha-beta (line 633)
generateChecks()    // Generate forcing moves (line 729)
generateEvasions()  // Generate defensive moves (line 777)
isCheck()          // Check detection (line 1157)
```

#### Coordinate System (lines 428-446)
Bidirectional conversion between Japanese notation and internal arrays:
- Human: `５一` (5-1 in Japanese notation)
- Internal: `[0, 4]` (row 0, column 4)

#### Search Algorithm Features
- **Iterative Deepening**: Incremental depth search (lines 589-608)
- **Hash Table**: Position caching to avoid redundant calculations (line 637-642)
- **Move Ordering**: Best moves tried first for better pruning
- **Node Limiting**: Max 100,000 nodes to prevent hanging (line 602)

### Recent Fixes (2025-08-14)

#### 3-Move Mate with Blocking Pieces
Fixed in lines 692-720 - now correctly includes defensive moves in solution:
```javascript
// Before: Showed "1-move mate" for 3-move problems
// After: Properly displays all moves including blocks/drops
```

## Key Implementation Details

### Move Generation Rules
- **Sente (Attacking)**: Must give check with every move
- **Gote (Defending)**: Must escape check or block if possible
- **Piece Drops**: Validated for two-pawn rule and promotion zones

### Performance Limits
```javascript
maxDepth: 15        // Maximum search depth
maxNodes: 100000    // Node count limit
timeout: 10000ms    // Search timeout
```

### Position Encoding Format
```
△５一玉 △４二歩 ▲２二飛 ▲持銀1
// △ = gote piece, ▲ = sente piece
// Position + piece type
// 持 = pieces in hand
```

## Testing Strategy

### Test Cases
1. **1-Move Mate**: Basic checkmate patterns
2. **3-Move with Drops**: Tests piece dropping from hand
3. **3-Move with Blocks**: Tests defensive blocking moves
4. **No-Mate Positions**: Verify correct "no solution" detection

### Debug Output Analysis
Enable debug mode to see:
- Move generation at each depth
- Check/evasion detection
- Hash table hits/misses
- Node count progression

## Known Issues & TODOs

### Current Limitations
- Deep puzzles (>7 moves) may timeout
- Some rare edge cases in repetition detection
- Performance degrades with many pieces

### Improvement Opportunities
1. **Move Ordering**: Implement killer heuristic for better pruning
2. **Transposition Table**: Increase size and improve replacement strategy
3. **Parallel Search**: Use Web Workers for concurrent searching
4. **Opening Book**: Pre-computed solutions for common patterns

## Development Workflow

1. **Making Changes**: Edit `Nanoha-tsume.html` directly
2. **Testing**: Refresh browser and use debug mode
3. **Debugging**: Check console for errors and debug output
4. **Validation**: Run test positions to ensure correctness

## Important Code Sections

### Critical Functions to Understand
- `search()` (633-726): Core minimax implementation
- `generateEvasions()` (777-923): Defensive move generation including blocks
- `canAttack()` (1189-1259): Attack validation with piece-specific rules
- `makeMove()/unmakeMove()` (1090-1154): Move execution and reversal

### Recent Changes Log
See `開発ログ_2025-08-14.md` for detailed changelog of the latest fixes.