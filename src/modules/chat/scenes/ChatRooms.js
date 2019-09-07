import React from 'react';

import {TouchableOpacity, Text, View, ScrollView, StyleSheet} from 'react-native';
import {STYLES, COLOR_WHITE} from "../../../styles";
import {connect} from 'react-redux';
import {userService} from "../../user";
import {enterChatRoom} from "../actions";


class ChatRooms extends React.Component {

    static navigationOptions = {
        title: 'Chat Rooms'
    };

    constructor() {
        super();
        this.state = {
            chatRooms: []
        };
    }

    componentDidMount() {
        this.initChatRooms();
    }

    initChatRooms = () => {
        let sessionUser = this.props.user;
        userService.getUsers(sessionUser)
            .then((users) => this.setState({
                chatRooms: users
                    .map(user => Object.assign({}, {name: user.name, participants: [sessionUser.uuid, user.uuid]}))
            }));
    }

    renderChatRooms = () => {
        let chatRooms = this.state.chatRooms;

        let output = [];

        chatRooms.forEach((chatRoom) => {
            output.push(
                <TouchableOpacity
                    key={chatRoom.name}
                    style={styles.chatRoomButton}
                    onPress={
                        () => this.props.enterChatRoom(chatRoom)
                            .then(() => {
                                this.props.navigation.navigate('ChatRoom',{username: this.props.user.name})
                            })
                    }
                >
                    <Text>{chatRoom.name}</Text>
                </TouchableOpacity>
            )
        });

        return output;

    }

    render() {
        return (
            <View style={STYLES.screenContainer}>
                <ScrollView>
                    {this.renderChatRooms()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (states) => {
    let state = states.userReducer;
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps, {enterChatRoom})(ChatRooms);


const styles = StyleSheet.create({
    chatRoomButton: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_WHITE,
        borderRadius: 15,
        opacity: 0.8,
        margin: 32
    }
});

