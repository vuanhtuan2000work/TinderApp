import { StyleSheet } from "react-native";
import { COLOR } from "../../styles/common";

export const processBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 5,
        alignSelf:'center',
        backgroundColor: COLOR.lightSilver,
        borderRadius: 10,
        marginTop: 10,
    },
    percentBar: {
        width: '100%',
        height: 5,
        backgroundColor: COLOR.cerisePink,
        borderRadius: 10,
    }
})