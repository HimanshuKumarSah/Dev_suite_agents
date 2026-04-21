import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const SplashScreen = ({ navigation }) => {
  return (
    <StyledView className="flex-1 bg-primary items-center justify-center">
      <StyledText className="text-secondary text-5xl font-bold mb-10">SKATE</StyledText>
      <StyledView className="mb-20">
        {/* Placeholder for animated logo */}
        <StyledText className="text-white text-xl">🛹 Rolling...</StyledText>
      </StyledView>
      <TouchableOpacity 
        className="bg-secondary px-10 py-4 rounded-full"
        onPress={() => navigation.navigate('Home')}
      >
        <StyledText className="text-primary font-bold text-lg">Enter the Session</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
};

export default SplashScreen;