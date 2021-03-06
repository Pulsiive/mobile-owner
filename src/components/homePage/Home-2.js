import * as React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Text,
    Linking,
} from 'react-native';

import Logo2 from "./Asset/logo-2.png";
import FB from "./Asset/fb.png";
import twitter from "./Asset/twitter.png";
import linkedin from "./Asset/link.png";
import google from "./Asset/google.png";

const styles = StyleSheet.create({
    Logo2: {
        width: 153,
        height: 153,
        position: 'absolute',
        top: 21.6 + '%',
        resizeMode: 'cover',
    },
    line: {
        width: 307,
        height: 1,
        position: 'absolute',
        top: 44.39 + '%',
        backgroundColor: '#707070',
    },
    Welcome: {
        color: 'white',
        fontWeight: '700',
        width: 326,
        height: 42,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: 0,
        position: 'absolute',
        top: 47.89 + '%',
    },
    border: {
        minWidth: 354,
        height: 44,
        borderRadius: 9,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        position: 'absolute',
        top: 55.34 + '%',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff1a',
        paddingBottom: 36.7,
        ...padding(9.9, 36.7),
    },
    logoFB: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
    TextFB: {
        position: 'absolute',
        top: 10 + '%',
        left: 18 + '%',
        color: 'white',
        fontWeight: 'bold',
    },
    Btn: {
        boxSizing: 'borderBox',
        width: 50 + '%',
        marginBottom: 0,
        ...padding(0, 4.5),
    },
    IText: {
        minHeight: 19,
        minWidth: 90,
        textAlign: 'center',
        letterSpacing: 0,
        lineHeight: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    groupBtn: {
        position: 'absolute',
        top: 63 + '%',
        width: 85 + '%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    content: {
        backgroundColor: '#81cd2c',
        borderRadius: 9,
        textAlign: 'center',
        height: 100 + '%',
        padding: 12,
    },
    group2: {
        position: 'absolute',
        top: 72 + '%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoG: {
        width: 20,
        height: 13,
        marginLeft: 23,
        resizeMode: 'cover',
    },
    logoT: {
        width: 20,
        height: 16,
        marginLeft: 23,
        resizeMode: 'cover',
    },
    logoL: {
        width: 20,
        height: 20,
        marginLeft: 23,
        resizeMode: 'cover',
    }
});

function padding(a, b, c, d) {
    return {
        paddingTop: a,
        paddingRight: b ? b : a,
        paddingBottom: c ? c : a,
        paddingLeft: d ? d : (b ? b : a)
    }
}

function HomeScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <Image source={Logo2} style={styles.Logo2} />
            <View style={styles.line}></View>
            <Text style={styles.Welcome}>Bienvenue sur Pulsiive !{'\n'}Commen??ons sans plus attendre !</Text>
            <TouchableHighlight style={styles.border} onPress={() => navigation.navigate('Planning')}>
                <View>
                    <Image source={FB} style={styles.logoFB} />
                    <Text style={styles.TextFB}>Se connecter avec Facebook</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.groupBtn}>
                <View style={styles.Btn}>
                    <View style={styles.content}>
                        <Text style={styles.IText}>S'inscrire</Text>
                    </View>
                </View>
                <View style={styles.Btn}>
                    <View style={styles.content}>
                        <Text style={styles.IText}>Se connecter</Text>
                    </View>
                </View>
            </View>
            <View style={styles.group2}>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.google.fr')}>
                    <Image source={google} style={styles.logoG}></Image>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://twitter.com')}>
                    <Image source={twitter} style={styles.logoT}></Image>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.linkedin.fr')}>
                    <Image source={linkedin} style={styles.logoL}></Image>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default HomeScreen2;