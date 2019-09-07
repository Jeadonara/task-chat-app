import {StyleSheet, Dimensions} from "react-native";

const COLOR_PRIMARY = "#FFA200";
const COLOR_SECONDARY = "#5636B8";
const COLOR_WHITE = "#FFFFFF";
const COLOR_GRAY = "#d2e8ff";
const COLOR_BLACK = "#000000";

const FONT = 'System';
const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const STYLES = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLOR_PRIMARY
    }
});
export {
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_WHITE,
    COLOR_GRAY,
    COLOR_BLACK,
    FONT,
    DIMENSION_WIDTH,
    DIMENSION_HEIGHT,
    STYLES
}
