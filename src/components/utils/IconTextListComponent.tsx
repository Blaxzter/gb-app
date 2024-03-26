import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import React from 'react';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';

type Props = {
  content: String[];
  icon: string;
  gap?: number;
  seperator?: string;
  iconColor?: string | undefined;
  color?: string | undefined;
  backgroundColor?: string | undefined;
};

const IconTextListComponent = ({
  content,
  icon,
  gap,
  seperator,
  iconColor,
  color,
  backgroundColor,
}: Props) => {
  const theme = useThemeSelection();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Icon
          source={icon}
          size={20}
          color={iconColor || theme.colors.onSurface}
        />
        <View style={{...styles.textRow, gap: gap === undefined ? 5 : gap}}>
          {content.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.item,
                backgroundColor: backgroundColor || theme.colors.surface,
                borderColor: backgroundColor || theme.colors.surface,
              }}>
              <Text
                style={{
                  ...styles.container,
                  backgroundColor: backgroundColor || theme.colors.surface,
                  color: color || theme.colors.onSurface,
                }}
                key={index}>
                {item}
                {index < content.length - 1 ? `${seperator || ''}` : ''}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 3,
  },
});

export default IconTextListComponent;
