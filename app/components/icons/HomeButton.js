import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import svg from ''

const HomeButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name="home" size={24} color="#000" />
    </TouchableOpacity>
);

export default HomeButton;
