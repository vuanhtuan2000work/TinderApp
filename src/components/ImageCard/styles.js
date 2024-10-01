import { StyleSheet } from "react-native";
import { COLOR } from "../../styles/common";

export const imageCardStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLOR.primaryColor,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: -15,
        zIndex: 9999,
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
    indicator: {

        height: 4,
        borderRadius: 10,
        marginHorizontal: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    userInfo: {
        marginTop: -100,
        marginLeft: 20,
        maxWidth: '95%',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: COLOR.primaryColor,
    },
    nextCard: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        borderRadius: 10,
        zIndex: -1,
    },
    touchArea: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});