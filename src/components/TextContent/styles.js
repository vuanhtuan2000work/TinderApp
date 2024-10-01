import { StyleSheet } from "react-native";
import { COLOR } from "../../styles/common";

export const textContentStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 13,
        color: COLOR.contentColor,
        alignSelf: 'center',
        textAlign: 'center'
    }
})