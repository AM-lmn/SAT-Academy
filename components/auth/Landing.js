import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import styles from '../styles'

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
                    Track all your results.
                </Text>
                <Text style={styles.smallerSubtitleText}>
                    50+ full SAT and PSAT tests, all brought into one app.
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
