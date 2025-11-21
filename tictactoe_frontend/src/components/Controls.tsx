import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type Props = {
  onReset: () => void;
  onNewGame: () => void;
  canUndo: boolean;
  onUndo?: () => void;
};

export const Controls: React.FC<Props> = ({ onReset, onNewGame, canUndo, onUndo }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onNewGame}
        style={({ pressed }) => [styles.button, styles.primary, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Start a new game"
      >
        <Text style={styles.buttonText}>New Game</Text>
      </Pressable>

      <Pressable
        onPress={onReset}
        style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Reset board"
      >
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>

      <Pressable
        onPress={onUndo}
        disabled={!canUndo}
        style={({ pressed }) => [
          styles.button,
          styles.outline,
          pressed && styles.pressed,
          !canUndo && styles.disabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Undo last move"
        accessibilityState={{ disabled: !canUndo }}
      >
        <Text style={[styles.buttonText, styles.outlineText]}>Undo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    gap: theme.spacing(1),
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.25),
    borderRadius: theme.radius.full,
    minWidth: 100,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  outlineText: {
    color: theme.colors.text,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  disabled: {
    opacity: 0.5,
  },
});
