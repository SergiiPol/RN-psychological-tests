import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import themeContext from '../providers/ThemeContext';

const PreStartMessage = () => {
    const {t} = useTranslation();
    const theme = useContext(themeContext);
    const [visible, setVisible] = useState(true);

    return (
        <View style={styles.containerInformation}>
            <TouchableOpacity onPress={() => !visible && setVisible(true)}>
                <Icon name="information-circle-sharp" size={32} color="white"  />
            </TouchableOpacity>
            <Modal visible={visible} animationType="slide" >
                <View style={styles.modalWrapper}>
                    <View style={[styles.modalContainer, {backgroundColor: theme.background}]}>
                        <Text style={styles.textModalHeader}>{t('azenk-pre-start-message-time')}{"\n"}</Text>
                        <Text style={styles.textModal}>{t('azenk-pre-start-message')}</Text>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <View style={styles.buttonClose}>
                               <Text style={styles.textButtonClose}>{t("Close")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    containerInformation: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 55,
        width: '30%',
        marginTop: 0,
    },
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f69a9a',
      },
      buttonClose: {
        marginTop: 50,
      },
      textButtonClose: {
        fontSize: 26,
        color: '#fc7482',
      },
      textModalHeader: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fffc',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding:20
      },
      textModal: {
        fontSize: 20,
        color: '#fffc',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding:20
      }
  });
  
export default PreStartMessage;

