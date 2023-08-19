import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const drawerStyle = StyleSheet.create({
    icon: {
        marginLeft: 22
    },
    font: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 8
    }
});

const calendarStyle = StyleSheet.create({
    dayLabel: {
        width: '20%',
        alignItems: 'center',
        padding: 10,
        borderRightColor: 'grey'
    },
    monthDateText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'ibm-semibold'
    },
    dayText: {
        fontSize: 12,
        fontFamily: 'ibm-medium',
        color: 'black'
    },
    allEvents: {
        width: '100%',
        borderLeftColor: 'gray',
        borderLeftWidth: 0.7
    },
    event: {
        flex: 1,
        width: '60%',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    eventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        justifyContent: 'space-between',
        width: '100%'
    },
    eventDuration: {
        width: '30%',
        justifyContent: 'center'
    },
    durationContainer: {
        flexDirection: 'row'
    },
    durationDot: {
        width: 8,
        height: 8,
        backgroundColor: 'red',
        marginRight: 5,
        alignSelf: 'center',
        borderRadius: 8 / 2
    },
    durationDotConnector: {
        height: 20,
        borderLeftColor: 'red',
        borderLeftWidth: StyleSheet.hairlineWidth,
        position: 'absolute',
        left: 4
    },
    durationText: {
        color: 'grey',
        fontSize: 12,
        fontFamily: 'ibm-medium'
    },
    eventNote: {
        color: 'black',
        width: '90%',
        fontFamily: 'ibm-regular'
    },
    lineSeparator: {
        width: '100%',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    dot: {
        width: 4,
        height: 4,
        marginTop: 1,
        alignSelf: 'center',
        borderRadius: 4 / 2,
        position: 'absolute',
        bottom: '10%'
    }
});

const detailPageStyle = StyleSheet.create({
    lineSeparator: {
        marginVertical: 5,
        width: '100%',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    textHeader: {
        fontSize: 16,
        fontFamily: 'ibm-semibold',
        marginBottom: 9,
        color: Colors.textHeader
    },
    ribbon: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 24
    },
    ribbonText: {
        color: '#FFF',
        fontSize: 11
    }
});

export { drawerStyle, calendarStyle, detailPageStyle };
