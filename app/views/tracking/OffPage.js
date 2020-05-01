import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import BackgroundImage from './../../assets/images/launchScreenBackground.png';
import StateUnknown from './../../assets/svgs/stateUnknown';
import { Typography } from './../../components/Typography';
import Colors from './../../constants/colors';
import ButtonWrapper from '../../components/ButtonWrapper';
import languages from '../../locales/languages';
import MayoInfo from './MayoInfo';
import styles from './style';

const buttonLabel = languages.t('label.home_enable_location');
const size = Dimensions.get('window').height;

export default function OffPage() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <View style={styles.pulseContainer}>
        <Text>Testdsfafasfsdafasfsadf</Text>
        <SvgXml
          xml={StateUnknown}
          width={size ? size : 80}
          height={size ? size : 80}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.contentAbovePulse}>
          <Typography style={styles.mainTextAbove} />
          <Typography style={styles.subsubheaderText} />
        </View>
        <View style={styles.contentBelowPulse}>
          <Text style={styles.mainTextBelow}>
            {languages.t('label.home_setting_off_header')}
          </Text>
          <Typography style={styles.subheaderText}>
            {languages.t('label.home_setting_off_subtext')}
          </Typography>
          <View style={styles.buttonContainer}>
            <ButtonWrapper
              title={buttonLabel}
              onPress={() => {
                navigation.navigate('SettingsScreen', {});
              }}
              buttonColor={Colors.BLUE_BUTTON}
              bgColor={Colors.WHITE}
            />
          </View>
        </View>
      </View>
      {MayoInfo()}
    </ImageBackground>
  );
}
