import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import type { Player } from '../utils/game';

type Props = {
  winner: Player | null;
  draw: boolean;
  next: Player;
};

export const StatusBar: React.FC<Props> = ({ winner, draw, next }) => {
  let text = `Turn: ${next}`;
  let color = theme.colors.text;

  if (winner) {
    text = `Winner: ${winner}`;
    color = theme.colors.success;
  } else if (draw) {
    text = 'It’s a draw';
    color = theme.colors.muted;
  }

  return (
    <View
      style={[styles.container, theme.shadow.sm]}
      accessibilityRole="text"
      accessibilityLabel={`Game status: ${text}`}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing(1.25),
    paddingHorizontal: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
