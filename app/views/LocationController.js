import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  BackHandler,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import settingsIcon from './../assets/svgs/settingsIcon';
import { isPlatformAndroid } from './../Util';
import Colors from '../constants/colors';
import LocationServices from '../services/LocationService';
import { DefaultPage } from './tracking/DefaultPage';
import { ExposurePage } from './tracking/ExposurePage';
import { OffPage } from './tracking/OffPage';
import { styles } from './tracking/style';
import { UnknownPage } from './tracking/UnknownPage';

export const LocationController = props => {
  if (isPlatformAndroid()) {
    StatusBar.setBackgroundColor(Colors.TRANSPARENT);
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }

  const [location, setLocation] = useState({
    canTrack: true,
    reason: '',
    hasPotentialExposure: false,
  });

  const SettingsIcon = () => {
    return (
      <TouchableOpacity
        style={styles.settingsContainer}
        onPress={() => {
          props.navigation.navigate('SettingsScreen');
        }}>
        {/* Is there is a reason there's this imageless image tag here? Can we delete it? */}
        <Image />
        <SvgXml xml={settingsIcon} width={30} height={30} color='white' />
      </TouchableOpacity>
    );
  };

  const updateStateInfo = async () => {
    const state = await LocationServices.checkStatus();
    setLocation(state);
  };

  const handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };

  useEffect(() => {
    updateStateInfo();
    // refresh state if user backgrounds app
    AppState.addEventListener('change', () => {
      updateStateInfo();
    });
    // refresh state if settings change
    const unsubscribe = props.navigation.addListener('focus', () => {
      updateStateInfo();
    });
    // handle back press
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      AppState.removeEventListener('change', updateStateInfo());
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      unsubscribe();
    };
  }, []);

  let page;

  if (location.canTrack) {
    if (location.hasPotentialExposure) {
      page = <ExposurePage />;
    } else {
      page = <DefaultPage />;
    }
  } else {
    if (location.reason === 'USER_OFF') {
      page = <OffPage />;
    } else {
      page = <UnknownPage />;
    }
  }

  return (
    <View style={styles.backgroundImage}>
      {page}
      <SettingsIcon />
    </View>
  );
};
