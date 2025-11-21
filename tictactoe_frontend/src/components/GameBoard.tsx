import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';
import { theme } from '../theme';
import type { Board } from '../utils/game';

type Props = {
  board: Board;
  disabled?: boolean;
  winningLine?: number[] | null;
  onCellPress: (index: number) => void;
};

export const GameBoard: React.FC<Props> = ({ board, disabled, winningLine, onCellPress }) => {
  return (
    <View
      style={[styles.grid, theme.shadow.md]}
      accessibilityRole="group"
      accessibilityLabel="Tic Tac Toe board, 3 by 3 grid"
    >
      {board.map((val, idx) => (
        <Cell
          key={idx}
          index={idx}
          value={val}
          onPress={onCellPress}
          disabled={disabled}
          highlight={Boolean(winningLine?.includes(idx))}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.outline,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 3 * 92 + theme.spacing(1.5) * 2 + 8, // approximate width including paddings
    gap: theme.spacing(1),
    justifyContent: 'center',
  },
});
