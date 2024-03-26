import React, {useState, useRef} from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {Drawer, Text} from 'react-native-paper';

const AnimatedDrawerMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // 0: closed, 1: open

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
    Animated.timing(animation, {
      toValue: isMenuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const drawerStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0], // Assuming the drawer's width is 300
        }),
      },
    ],
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View style={[drawerStyle]}>
        <Drawer.Section title="Some Drawer">
          <Drawer.Item label="First Item" />
          <Drawer.Item label="Second Item" />
        </Drawer.Section>
      </Animated.View>
      <TouchableOpacity onPress={toggleMenu}>
        <Text>Toggle Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedDrawerMenu;
