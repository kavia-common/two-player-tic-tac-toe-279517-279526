import React, { memo } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';
import type { CellValue } from '../utils/game';

type Props = {
  index: number;
  value: CellValue;
  disabled?: boolean;
  highlight?: boolean;
  onPress: (index: number) => void;
};

const CELL_SIZE = 92;

const CellComponent: React.FC<Props> = ({ index, value, disabled, highlight, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(index)}
      disabled={disabled || Boolean(value)}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        highlight ? styles.highlight : undefined,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Cell ${index + 1}, ${value ? value : 'empty'}`}
      accessibilityState={{ disabled: disabled || Boolean(value), selected: Boolean(value) }}
      android_ripple={{ color: theme.colors.outline }}
    >
      <Text style={[styles.value, value === 'X' ? styles.x : value === 'O' ? styles.o : undefined]}>
        {value ?? ''}
      </Text>
    </Pressable>
  );
};

export const Cell = memo(CellComponent);

const styles = StyleSheet.create({
  base: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  highlight: {
    borderColor: theme.colors.secondary,
    shadowColor: theme.colors.secondary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  value: {
    fontSize: 48,
    fontWeight: '800',
    color: theme.colors.text,
  },
  x: { color: theme.colors.primary },
  o: { color: theme.colors.secondary },
});
