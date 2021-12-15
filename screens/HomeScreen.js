import { useNavigation } from '@react-navigation/core'
import React ,{useRef}from 'react'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn'

import { AntDesigned, Entypo, Ionicons } from '@expo/vector-icons'
import Swiper from "react-native-deck-swiper"
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
const HomeScreen = () => {

    const navigation = useNavigation();
    //pull the logout function from auth
    const { user, logout } = useAuth();

    //Reference is like a pointer, to point on any object on the screen
    const swipeRef = useRef(null);
    DUMMY_DATA = [
        {
            firstName: "Vlad",
            lastName: "Chechota",
            occupation: "Software developer",
            photoURL: "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.18169-9/11025184_10205247700366387_3691466043503886784_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=ba80b0&_nc_ohc=xHefrSk9Nz0AX-883i9&_nc_ht=scontent.fsdv2-1.fna&oh=00_AT8-r4t-DpR5G3Kb0bVzUg4gPSBvOKBq2O18nxv0DLOfDA&oe=61DE569A",
            age: 29,
            id: 1
        },
        {
            firstName: "Vlad",
            lastName: "Chechota",
            occupation: "Software developer",
            photoURL: "https://scontent.fsdv2-1.fna.fbcdn.net/v/t31.18172-8/1462638_727386657289047_299849066_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=12PxWDvYyVcAX-25C9M&_nc_ht=scontent.fsdv2-1.fna&oh=00_AT_yJknUOduDcVZCRS5huXdD-6TYeTjNoTJrwf5UNwFBNw&oe=61DFBD2E",
            age: 29,
            id: 2
        },
        {
            firstName: "Vlad",
            lastName: "Chechota",
            occupation: "Software developer",
            photoURL: "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.18169-9/12227604_10206901439748838_4007229486048423639_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=0rTSe2mOMggAX9xI9LG&tn=ECrDnffhoBC2_Jfu&_nc_ht=scontent.fsdv2-1.fna&oh=00_AT9VOiHreO0f7qjLewB4s8QfHyeU2fKeXpL3kDq2BhP03w&oe=61DD61C0",
            age: 29,
            id: 3
        },
    ]


    return (
        <SafeAreaView style={tw("flex-1")}>

            {/* Header */}

            <View style={tw("flex-row items-center justify-between px-5")}>

                <TouchableOpacity onPress={logout}>
                    <Image
                        style={tw('h-10 w-10 rounded-full')}
                        source={{ uri: user.photoURL }}
                    />
                </TouchableOpacity>

                <TouchableOpacity >
                    <Image style={tw("h-14 w-14")}
                        source={require("../tinderlogo.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name='chatbubbles-sharp' size={30} color='#FF5864' />
                </TouchableOpacity>
            </View>
            {/* end of header */}

            {/* Cards */}

            <View style={tw('flex-1  -mt-6')}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        console.log('Swipe NOPE')
                    }}
                    onSwipedRight={() => {
                        console.log('Swipe MATCH')
                    }}
                    backgroundColor={"#4FD0E9"}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red"
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "green"
                                },
                            },
                        },
                    }}
                    renderCard={card => (
                        <View
                            key={card.id}
                            style={tw("relative bg-white h-3/4 rounded-xl")}
                        >
                            <Image
                                source={{ uri: card.photoURL }}
                                style={tw("absolute top-0 h-full w-full rounded-xl ")}
                            />

                            <View
                                style={[tw(
                                    "absolute flex-row bottom-0 bg-white w-full h-20 justify-between px-6 py-2 rounded-b-xl items-center"
                                ), styles.cardShadow]}
                            >
                                <View>
                                    <Text style={tw("text-xl font-bold")}>
                                        {card.firstName} {card.lastName}
                                    </Text>
                                    <Text>{card.occupation}</Text>
                                </View>

                                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                            </View>

                        </View>
                    )}
                />

            </View>



            {/* End of cards */}


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }
})
export default HomeScreen
