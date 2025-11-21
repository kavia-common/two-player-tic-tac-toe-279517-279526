import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { theme } from './src/theme';
import {
  Board,
  Player,
  calculateWinner,
  createEmptyBoard,
  isDraw,
  nextPlayer,
} from './src/utils/game';
import { GameBoard } from './src/components/GameBoard';
import { StatusBar as GameStatus } from './src/components/StatusBar';
import { Controls } from './src/components/Controls';
import { persist, restore, remove } from './src/utils/storage';

type PersistedState = {
  board: Board;
  history: Board[];
};

const STORAGE_KEY = 'tictactoe:v1';

export default function App() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [history, setHistory] = useState<Board[]>([]);

  // Derived state
  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const winner: Player | null = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;
  const draw = useMemo(() => isDraw(board), [board]);
  const turn = useMemo(() => nextPlayer(board), [board]);
  const gameOver = Boolean(winner) || draw;

  // Load persisted state
  useEffect(() => {
    let mounted = true;
    (async () => {
      const restored = await restore<PersistedState | null>(STORAGE_KEY, null);
      if (mounted && restored?.board?.length === 9) {
        setBoard(restored.board);
        setHistory(restored.history ?? []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist on changes
  useEffect(() => {
    const save = async () => {
      const state: PersistedState = { board, history };
      await persist(STORAGE_KEY, state);
    };
    void save();
  }, [board, history]);

  const handlePress = useCallback(
    (index: number) => {
      if (gameOver || board[index]) return;
      setHistory((h) => [...h, board]);
      setBoard((prev) => {
        const next = [...prev];
        next[index] = nextPlayer(prev);
        return next;
      });
    },
    [board, gameOver]
  );

  const handleReset = useCallback(() => {
    setBoard(createEmptyBoard());
  }, []);

  const handleNewGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setHistory([]);
    void remove(STORAGE_KEY);
  }, []);

  const handleUndo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setBoard(prev);
      return h.slice(0, -1);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={undefined as never}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text
          style={styles.title}
          accessibilityRole="header"
          accessibilityLabel="Tic Tac Toe"
        >
          Tic Tac Toe
        </Text>

        <View style={styles.statusRow}>
          <GameStatus winner={winner} draw={draw} next={turn} />
        </View>

        <View style={styles.boardRow}>
          <GameBoard
            board={board}
            disabled={gameOver}
            winningLine={winningLine}
            onCellPress={handlePress}
          />
        </View>

        <Controls
          onReset={handleReset}
          onNewGame={handleNewGame}
          canUndo={history.length > 0 && !gameOver}
          onUndo={handleUndo}
        />

        <View
          accessibilityRole="text"
          accessibilityLabel={`Move history length ${history.length}`}
          style={styles.meta}
        >
          <Text style={styles.metaText}>Moves: {board.filter(Boolean).length}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing(2),
    paddingTop: theme.spacing(4),
    gap: theme.spacing(3),
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: 0.2,
  },
  statusRow: {
    marginTop: theme.spacing(0.5),
  },
  boardRow: {
    marginTop: theme.spacing(1),
  },
  meta: {
    marginTop: theme.spacing(1),
  },
  metaText: {
    color: theme.colors.muted,
  },
});
