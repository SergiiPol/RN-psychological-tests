import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const PreStartMessage = () => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(true);

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(true)} >
                <Icon name="information-circle-sharp" size={24} color="white"  />
            </TouchableOpacity>
            <Modal visible={visible} animationType="slide" >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor:'#f69a9a',  padding: 15}}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>{t('azenk-pre-start-message-time')}{"\n"}</Text>
                    <Text style={{fontSize: 20}}>{t('azenk-pre-start-message')}</Text>
                    <Button title={t("Close")} onPress={() => setVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default PreStartMessage;

