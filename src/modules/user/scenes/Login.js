import React from 'react';

import {TouchableOpacity, Text, View, Alert, StyleSheet, TextInput} from 'react-native';
import {DIMENSION_WIDTH, FONT, COLOR_PRIMARY, COLOR_SECONDARY, STYLES, COLOR_WHITE} from "../../../styles";
import {login} from "../actions";
import {connect} from 'react-redux';
import * as userService from "../service";
import {LIMIT_USERNAME_MIN_CHARACTERS} from "../contants";

class Login extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            name: null,
            isAlreadyRegistered: null,
            backgroundColor: COLOR_PRIMARY
        };
    }

    componentDidMount() {
        userService.getUser((user) => this.initUser(user));
    }

    initUser = (user) => {
        if (user != null && this.isUsernameValid(user.name)) {
            this.setState({
                name: user.name,
                isAlreadyRegistered: true
            }, () => this.props.login(user.name));
        } else {
            this.setState({isAlreadyRegistered: false})
        }
    }

    isUsernameValid = (name) => {
        return name != null && name.length > LIMIT_USERNAME_MIN_CHARACTERS
    }

    displayErrorMessage = () => {
        Alert.alert(
            null,
            'Username must contain at least 3 characters',
            {
                onDismiss: () => {
                }, cancelable: true
            }
        )
    }

    submitLoginRequest = (name) => {
        if (this.isUsernameValid(name)) {
            this.props.login(name)
                .then(() => this.props.navigation.navigate('ChatRooms'))
        } else {
            this.displayErrorMessage();
        }
    }

    renderForExistingUser = () => {
        let name = this.state.name;
        return (
            <View style={STYLES.screenContainer}>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 200}}>
                    <Text style={styles.title}>WELCOME</Text>
                    <Text style={styles.name}>{name}</Text>
                    <TouchableOpacity
                        style={[styles.textSubmitButton, {opacity: 1}]}
                        onPress={() => this.submitLoginRequest(name)}
                        disabled={false === this.isUsernameValid(name)}
                    >
                        <Text style={styles.textSubmitButtonTitle}>Start Chatting Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderForNewUser = () => {
        let name = this.state.name;
        return (
            <View style={STYLES.screenContainer}>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 100}}>
                    <Text style={styles.title}>Login With User Name</Text>
                    <TextInput placeholder="name"
                               style={[styles.textInput]}
                               onChangeText={(text) => this.setState({name: text})}
                               value={name}
                    />
                    <TouchableOpacity
                        style={[styles.textSubmitButton, {opacity: this.isUsernameValid(name) ? 1 : 0.3}]}
                        onPress={() => this.submitLoginRequest(this.state.name)}
                        disabled={false === this.isUsernameValid(name)}
                    >
                        <Text style={styles.textSubmitButtonTitle}>Start Chatting Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let isAlreadyRegistered = this.state.isAlreadyRegistered;
        if (true === isAlreadyRegistered)
            return this.renderForExistingUser();
        else if (false === isAlreadyRegistered)
            return this.renderForNewUser();
        else
            return (
                <View style={STYLES.screenContainer}/>
            );
    }
}

export default connect(null, {login})(Login);


const styles = StyleSheet.create({
    title: {
        fontFamily: FONT,
        fontWeight: '400',
        fontSize: 24,
        color: COLOR_WHITE,
        margin: 16,
        fontStyle: 'italic'
    },
    name: {
        fontFamily: FONT,
        fontWeight: '900',
        fontSize: 24,
        color: COLOR_WHITE,
        margin: 16
    },
    textInput: {height: 40, width: 120, backgroundColor: COLOR_WHITE, borderRadius: 5, margin: 16},
    textSubmitButton: {
        height: 90,
        width: DIMENSION_WIDTH - 40,
        backgroundColor: COLOR_SECONDARY,
        borderRadius: (DIMENSION_WIDTH - 40) / 4,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSubmitButtonTitle: {
        fontFamily: FONT,
        fontWeight: 'bold',
        fontSize: 32,
        color: COLOR_WHITE,
    }
});
