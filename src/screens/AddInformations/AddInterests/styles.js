import { StyleSheet } from "react-native";
import { COLOR } from "../../../styles/common";

export const addInterestsStyles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
      },
      listItem: {
        width: '100%',
        height: '63%',
        padding: 10,
        paddingHorizontal: 20
      },
      flexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      hobbyItem: {
        margin:6,
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 65,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        borderColor: COLOR.romanSilver,
        borderWidth: 2
      },
      hobbyText: {
        color: COLOR.romanSilver,
        fontSize: 16,
        fontWeight: 'bold'
      },
})