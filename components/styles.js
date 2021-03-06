// This file holds the styling for every single page in the app
import { StyleSheet, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    landingContainer: {
        height: deviceHeight,
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        height: 2*(deviceHeight/3),
        width: deviceWidth,
        padding: deviceWidth/10,
        marginBottom: deviceHeight/20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        height: deviceHeight/4
    },
    titleRegisterAndLogin: {
        marginTop: deviceHeight/10,
        height: deviceHeight/3,
        width: deviceWidth,
        padding: deviceWidth/10,
        marginBottom: deviceHeight/20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyle: {
        height: 215,
        width: 219
    },
    orImage: {
        width: 3*(deviceWidth/4),
        height: 44
    },
    logoStyle2: {
        height: 150,
        width: 150
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    inputSubmitScore: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginLeft: 30,
        paddingLeft: 16
    },
    titleText: {
        textAlign: 'center',
        color:'lightblue',
        fontSize: deviceHeight/15,
        fontWeight: 'bold',
        marginBottom: deviceHeight/17,
        marginTop: deviceHeight/20,
        textShadowColor:'gray',
        textShadowOffset:{width: deviceHeight / 400, height: deviceHeight / 400},
        textShadowRadius: deviceHeight / 500
    },
    titleText2: {
        textAlign: 'center',
        color:'lightblue',
        fontSize: deviceHeight/20,
        fontWeight: 'bold',
        marginBottom: deviceHeight/17,
        marginTop: deviceHeight/20,
        textShadowColor:'gray',
        textShadowOffset:{width: deviceHeight / 400, height: deviceHeight / 400},
        textShadowRadius: deviceHeight / 500
    },
    testAndAnswerAndScoreEnterSection: {
        flexDirection: 'row',
    },
    titleLandingText: {
        textAlign: 'center',
        color:'lightblue',
        fontSize: deviceHeight/15,
        fontWeight: 'bold',
        marginBottom: 5,
        textShadowColor:'gray',
        textShadowOffset:{width: deviceHeight / 400, height: deviceHeight / 400},
        textShadowRadius: deviceHeight / 500
    },
    subtitleText: {
        textAlign: 'center',
        color:'black',
        fontSize: deviceHeight/35,
        fontWeight: 'bold',
        marginTop: 5,
        textShadowColor:'gray',
        textShadowOffset:{width: deviceHeight / 400, height: deviceHeight / 400},
        textShadowRadius: deviceHeight / 500
    },
    smallerSubtitleText: {
        textAlign: 'center',
        color:'black',
        fontSize: deviceHeight/55,
        fontWeight: 'bold',
        marginTop: 5,
        textShadowColor:'gray',
        textShadowOffset:{width: deviceHeight / 600, height: deviceHeight / 600},
        textShadowRadius: deviceHeight / 700
    },
    button: {
        backgroundColor: 'lightblue',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        width: deviceWidth/1.2,
        height: deviceHeight/18,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    logoutButton: {
        backgroundColor: 'blue',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        width: deviceWidth/3,
        height: deviceHeight/25,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonLogin: {
        backgroundColor: '#ffffff00',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        width: deviceWidth/1.2,
        height: deviceHeight/18,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    hubLoading: {
        height: deviceHeight,
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    practiceQuestionButton: {
        marginLeft: 20,
        marginRight: 10,
        marginTop: 20,
        width: 3*(deviceWidth/10),
        height: deviceHeight/12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    practiceSATTestContainer: {
        height: 4*(deviceHeight/5),
        width: deviceWidth,
        margin: 20,
    },
    practicePSATTestContainer: {
        height: 4*(deviceHeight/5),
        width: deviceWidth,
        margin: 20,
    },
    sampleAnswerSheetsContainer: {
        height: 2*(deviceHeight/5),
        width: deviceWidth,
        margin: 20,
    },
    practiceQuestionButtonContainer: {
        margin: 20,
        height: deviceHeight/5,
        width: deviceWidth
    },
    practiceTestButton: {
        marginLeft: 20,
        marginRight: 10,
        marginTop: 20,
        width: 3*(deviceWidth/10),
        height: deviceHeight/7,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    scoreOverview: {
        marginLeft: 20,
        marginRight: 10,
        marginTop: 20,
        width: 3*(deviceWidth/10),
        height: deviceHeight/6,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    enterAndSubmitScoreContainer: {
        flexDirection: 'column',
        height: deviceHeight/7,
        justifyContent: 'center',
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    google: {
        height: 55,
        width: 55
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonTitleLogout: {
        color: 'white',
        fontSize: 13,
        fontWeight: "bold"
    },
    headerPlusLogo: {
        flexDirection: 'row'
    },
    buttonTitleLogin: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})