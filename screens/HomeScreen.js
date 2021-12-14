import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn'

const HomeScreen = () => {

    const navigation = useNavigation();
    //pull the logout function from auth
    const { user, logout } = useAuth();


    return (
        <SafeAreaView>

            {/* {header} */}

            <View style={tw("items-center relative")}>
                <TouchableOpacity style={tw("absolute left-5 top-3")}>
                    <Image
                        style={tw('h-10 w-10 rounded-full')}
                        source={{ uri: user.photoURL }}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={tw("h-14 w-14")}
                        source={require("../logo.png")}
                    />
                </TouchableOpacity>
            </View>
            {/* end of header */}
            {/* 
            <Text>I m the home screen</Text>
            <Button title="Go to chat screen" onPress={() => navigation.navigate('Chat')} />

            <Button title="Logout" onPress={logout} /> */}
        </SafeAreaView>
    )
}

export default HomeScreen
