import React, { useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';

interface AnimatedButtonProps {
  onPress: () => void;
  style?: any;
  children: React.ReactNode;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  onPress, 
  style, 
  children, 
  disabled = false 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Animated.View style={[
        style,
        { transform: [{ scale: scaleAnim }] },
        disabled && { opacity: 0.6 }
      ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};