import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CalendarList, isCalendarEnabled } from '../../../../../calendar-sync';
import { RecentList } from '../../../../../recent-list';
import {
    calendarListTabBarOptions,
    recentListTabBarOptions,
    settingsTabBarOptions,
    tabBarOptions
} from '../../../../../welcome/constants';
import { screen } from '../../../routes';
import SettingsNavigationContainer
    from '../../settings/components/SettingsNavigationContainer';

const WelcomePage = createBottomTabNavigator();


/**
 * The type of the React {@code Component} props of {@link WelcomePageTabs}.
 */
type Props = {

    /**
     * Renders the lists disabled.
     */
    disabled: boolean,

    /**
     * Callback to be invoked when pressing the list container.
     */
    onListContainerPress?: Function,

    /**
     * Callback to be invoked when settings screen is focused.
     */
    onSettingsScreenFocused: Function
};


const WelcomePageTabs = ({ disabled, onListContainerPress, onSettingsScreenFocused }: Props) => {
    const { t } = useTranslation();
    const RecentListScreen = useCallback(() =>
        (
            <RecentList
                disabled = { disabled }
                onListContainerPress = { onListContainerPress } />
        )
    );

    const calendarEnabled = useSelector(isCalendarEnabled);

    const CalendarListScreen = useCallback(() =>
        (
            <CalendarList
                disabled = { disabled } />
        )
    );

    const SettingsScreen = useCallback(() =>
        (
            <SettingsNavigationContainer
                isInWelcomePage = { true } />
        )
    );

    return (
        <WelcomePage.Navigator
            backBehavior = { 'none' }
            screenOptions = {{
                ...tabBarOptions,
                headerShown: false
            }}>
            <WelcomePage.Screen
                listeners = {{
                    tabPress: () => {
                        onSettingsScreenFocused(false);
                    }
                }}
                name = { screen.welcome.tabs.recent }
                options = {{
                    ...recentListTabBarOptions,
                    title: t('React-Native') //welcomepage.recentList
                }}>
                { RecentListScreen }
            </WelcomePage.Screen>
            {
                calendarEnabled
            && <WelcomePage.Screen
                listeners = {{
                    tabPress: () => {
                        onSettingsScreenFocused(false);
                    }
                }}
                name = { screen.welcome.tabs.calendar }
                options = {{
                    ...calendarListTabBarOptions,
                    title: t('welcomepage.calendar')
                }}>
                { CalendarListScreen }
            </WelcomePage.Screen>
            }
            <WelcomePage.Screen
                listeners = {{
                    tabPress: () => {
                        onSettingsScreenFocused(true);
                    }
                }}
                name = { screen.settings.main }
                options = {{
                    ...settingsTabBarOptions,
                    title: t('welcomepage.settings')
                }}>
                { SettingsScreen }
            </WelcomePage.Screen>
        </WelcomePage.Navigator>
    );
};

export default WelcomePageTabs;
