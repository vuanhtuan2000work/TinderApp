import { StyleSheet } from "react-native";
import { COLOR } from "../../styles/common";

export const buttonLineStyles = StyleSheet.create({
    container: {
        width: '90%',
        height: 48,
        borderRadius: 60,
        borderColor: COLOR.primaryColor,
        borderWidth: 1,
        justifyContent:'center', 
        alignItems:'center',
        marginTop: 25
    },
    titleStyle: {
        fontSize: 16,
        color: COLOR.primaryColor,
        fontWeight: 'semibold',
        alignSelf: 'center',
    }
}) 