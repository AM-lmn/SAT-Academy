import React from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import styles from '../styles'

/* TODO: Fully style this page. Not yet completed. */

export default function Landing({ navigation }) {
    return (
        <View style={styles.landingContainer}>
            <View style={styles.title}>
                <Image
                    style={styles.logoStyle}
                    source={require('../../assets/satlogo.png')}
                    resizeMode="cover"
                />
                <Text style={styles.titleLandingText}>
                    SAT Academy
                </Text>
                <Text style={styles.subtitleText}>
                    Learn like no other
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Register")}>
                <Text style={styles.buttonTitle}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonTitleLogin}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}
