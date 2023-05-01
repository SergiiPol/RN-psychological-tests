import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import {LanguageSelect} from './languageSelect';
import SwitcherTheme from './SwitcerTheme';
import themeContext from '../providers/themeContext';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import ReturnFlag from '../components/ReturnFlag';


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
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
            <ReturnFlag style={styles.flagIcon}/>
            <AntDesign style={styles.settingIcon} name="setting" size={24} color="#562B1A" />
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
              <Ionicons name="close" size={24} color="white" />
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
    backgroundColor: '#D5AA72',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    height: 55,
    width: '30%',
  },
  flagIcon:{
    display: 'flex',
    marginLeft: 20,
  },
  settingIcon: {
    display: 'flex',
    marginLeft: 20,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 210,
    height: 200,
    backgroundColor: '#D5AA72',
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