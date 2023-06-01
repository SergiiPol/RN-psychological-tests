import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import themeContext from '../providers/ThemeContext';

const PreStartMessage = ( { messageTime, messageText } ) => {
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
                <ScrollView style={styles.scrollView}>
                    <View style={[styles.modalContainer, {backgroundColor: theme.background}]}>
                        <Text style={styles.textModalHeader}>{messageTime}{"\n"}</Text>
                        <Text style={styles.textModal}>{messageText}</Text>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <View style={styles.buttonClose}>
                               <Text style={styles.textButtonClose}>{t("Close")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
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
        height: 30,
        width: 30,
        marginTop: 7,
        marginRight: 10,
        zIndex: 20
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
      },
      buttonClose: {
        marginTop: 50,
      },
      textButtonClose: {
        fontSize: 26,
        color: 'green',
        marginBottom: 50
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

