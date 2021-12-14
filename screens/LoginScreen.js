import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react'
import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn';


const LoginScreen = () => {
    // Get signInWithGoogle from useAuth (Easy to change the sign in provider,Good for HOT SWAP)
    const { signInWithGoogle } = useAuth();

    // Trigger when UI component mounts.

    // useLayoutEffect(() => {
    //     // Instead of spamming the stack navigator(Higher level component) setting options headerShown in stack navigator
    //     navigation.setOptions({
    //         headerShown: false,
    //     });
    // }, []);


    const navigation = useNavigation();
    return (
        <View style={tw("flex-1")}>
            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={{ uri: "https://tinder.com/static/tinder.png" }}
            >
                <TouchableOpacity onPress={signInWithGoogle} style={[tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl "), { marginHorizontal: "25%" }]}>
                    <Text style={tw('font-bold text-center')} >Sign in & get swiping</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}

export default LoginScreen
