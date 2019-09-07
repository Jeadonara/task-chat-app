import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import Login from '../modules/user/scenes/Login'
import ChatRoom from '../modules/chat/scenes/ChatRoom'
import ChatRooms from '../modules/chat/scenes/ChatRooms'
import {COLOR_BLACK, COLOR_WHITE, FONT} from "../styles";

const App = createStackNavigator(
    {
        Login: {screen: Login},
        ChatRooms: {screen: ChatRooms},
        ChatRoom: {screen: ChatRoom},
    },
    {
        initialRouteName: 'Login',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerTitleStyle: {
                fontFamily: FONT,
                fontWeight: "bold"
            },
            headerTintColor: COLOR_BLACK,
            headerStyle: {
                backgroundColor: COLOR_WHITE,
            }
        },
    }
);

export default createAppContainer(App);
