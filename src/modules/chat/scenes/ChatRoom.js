import React from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    STYLES,
    COLOR_WHITE,
    FONT,
    DIMENSION_WIDTH,
    COLOR_SECONDARY,
    COLOR_BLACK,
    COLOR_PRIMARY,
    COLOR_GRAY
} from "../../../styles";
import {connect} from 'react-redux';
import firebase from '../../../config/firebase';
import {Header} from 'react-navigation';

class ChatRoom extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.username
        };
    };

    constructor() {
        super();
        this.state = {
            messages: [],
            messageText: null
        };
        this.unsubscribeMessages = null;
    }

    componentDidMount() {
        this.unsubscribeMessages = this.props.chatRoom.chatRoomRef
            .onSnapshot((doc) => {
                this.getMessages(doc);
            });
    }

    componentWillUnmount() {
        this.unsubscribeMessages();
    }

    getMessages = (doc) => {
        let messages = [];
        doc.data().messages.map(message => {
            messages.push({text: message.text, author: message.author, timestamp: message.timestamp});
        });
        this.setState({messages: messages});
    }

    renderMessages = () => {
        return this.state.messages.map((message, index) => {
            let isAuthorCurrentUser = this.props.user.uuid === message.author;

            return (
                <View
                    key={index.toString()}
                    style={
                        [styles.messageContainer,
                            {
                                backgroundColor: isAuthorCurrentUser ? COLOR_BLACK : COLOR_SECONDARY,
                                alignSelf: isAuthorCurrentUser ? 'flex-end' : 'flex-start',
                            }
                        ]
                    }>
                    <Text style={styles.messageText}>
                        {message.text}
                    </Text>
                </View>
            )
        })
    }

    renderMessageSendContainer = () => {
        return (
            <View style={styles.textSubmitContainer}>
                <TextInput placeholder="message"
                           style={[styles.messageTextInput]}
                           onChangeText={(text) => this.setState({messageText: text})}
                           value={this.state.messageText}
                />
                <TouchableOpacity
                    style={styles.textSubmitButton}
                    onPress={() => this.sendMessage(this.state.messageText)}
                    disabled={this.state.messageText == null || 1 > this.state.messageText.length}
                >
                    <Text style={styles.textSubmitButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }


    sendMessage = () => {
        let newMessage = {
            text: this.state.messageText,
            author: this.props.user.uuid,
            timestamp: Date.now()
        };
        this.props.chatRoom.chatRoomRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={"padding"}
                keyboardVerticalOffset={Header.HEIGHT + 20}
                style={STYLES.screenContainer}>
                <ScrollView style={{flex: 2, margin: 16, width: DIMENSION_WIDTH}}
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({animated: true});
                            }}>
                    {this.renderMessages()}
                </ScrollView>
                {this.renderMessageSendContainer()}
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (states) => {
    let state = states.chatReducer;
    let stateUser = states.userReducer;
    return {
        chatRoom: state.chatRoom,
        user: stateUser.user
    };
};
export default connect(mapStateToProps, {})(ChatRoom);


const
    styles = StyleSheet.create({
        messageContainer: {
            justifyContent: 'center',
            minWidth: 90,
            maxWidth: 200,
            minHeight: 40,
            borderRadius: 10,
            margin: 8,
            flexWrap: 'wrap',
            backgroundColor: COLOR_SECONDARY
        },
        messageText: {
            margin: 8,
            fontFamily: FONT,
            fontWeight: '900',
            fontSize: 24,
            color: COLOR_WHITE,
            textAlign: 'left'
        },
        textSubmitContainer: {
            height: 100,
            width: DIMENSION_WIDTH,
            backgroundColor: COLOR_WHITE,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        messageTextInput: {
            marginHorizontal: 16,
            flex: 1,
            minHeight: 80,
            borderRadius: 5,
            backgroundColor: COLOR_GRAY
        },
        textSubmitButton: {
            height: 50,
            width: 80,
            marginHorizontal: 16,
            borderRadius: 10,
            backgroundColor: COLOR_PRIMARY,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textSubmitButtonText: {
            fontFamily: FONT,
            fontWeight: 'bold',
            fontSize: 24,
            color: COLOR_WHITE,
            textAlign: 'center'
        }
    });

