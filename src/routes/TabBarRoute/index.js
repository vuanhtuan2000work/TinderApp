import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Home from '../../screens/Home';
import Star from '../../screens/Star';
import { COLOR } from '../../styles/common';
import Chat from '../Chat';

const Tab = createBottomTabNavigator();

const TabBarRoute = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    const icons = {
                        Home: require('../../assets/tinder_logo.png'),
                        Chat: require('../../assets/message.png'),
                        Star: require('../../assets/star.png'),
                    };

                    return (
                        <Image
                            source={icons[route.name]}
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: color }}
                        />
                    );
                },
                tabBarActiveTintColor: COLOR.sunsetOrange,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle:{
                    paddingBottom: 10, 
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarShowLabel: false }} />
            <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false, tabBarShowLabel: false }} />
            <Tab.Screen name="Star" component={Star} options={{ headerShown: false , tabBarShowLabel: false }} />
        </Tab.Navigator>
    )
}

export default TabBarRoute

const styles = StyleSheet.create({})