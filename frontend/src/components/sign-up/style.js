import COLOURS from '../../assets/colours';

import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get("window");

export default styles = StyleSheet.create({
    logo: {
        width: 249,
        height: 200,
        marginTop: screen.height/13,
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 270,
        borderRadius: 10,
        width: screen.width * 0.7,
        height: screen.height * 0.05,
        paddingHorizontal: 10,
    },
    createAccountButton: {
        backgroundColor: COLOURS.blue,
        borderRadius: 3,
        paddingHorizontal: 70,
        paddingVertical: 5,
        marginTop: 40,
        marginBottom: 30,
        textAlign: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
    },
    label: {
        color: COLOURS.white,
        fontSize: 18,
        fontStyle: 'italic',
    },
    loginText: {
        color: COLOURS.white,
        textDecorationLine: 'underline',
    },
    invalidSignupBox: {
        borderColor: COLOURS.red,
        borderWidth: 1,
        justifyContent: 'center',
        padding: 12,
        width: 270,
    },
    invalidSignup: {
        color: COLOURS.white,
        fontSize: 16,
    }
});