import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { LanguageSelect } from './LanguageSelect';
import SwitcherTheme from './SwitcerTheme';
import themeContext from '../providers/themeContext';
import { Ionicons } from '@expo/vector-icons';

const ToolBar = () => {
  const theme = useContext(themeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons style={styles.burgers} name="menu" size={32} color="white" />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalWrapper}>
          <View style={[styles.modalContainer, {backgroundColor: theme.background}]}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={36} color="white" />
            </TouchableOpacity>
            <LanguageSelect style={styles.languageSelect} />
            <SwitcherTheme style={styles.switcherTheme} />
          </View>
          <View style={styles.overlay} pointerEvents="box-none" onTouchStart={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    height: 55,
    width: '30%',
  },
  burgers: {
    marginTop: 10,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    right: 0,
    top: 200,
    width: 180,
    height: 200,
    backgroundColor: '#f4511e',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingLeft: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default ToolBar;