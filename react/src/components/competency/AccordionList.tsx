import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    UIManager
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import Colors from '../../constants/Colors';
import { Pillar, Subdomain } from '../../models/Subdomain';
import mapPillarIcon from '../../utils/MapPillarIcon';

interface Props {
    pillar: Pillar;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    onOpenAccordion: () => void;
    openKey: number | null;
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const AccordionList = (props: Props): JSX.Element => {
    return (
        <>
            {props.pillar.subdomains.length > 0 && (
                <View style={styles.listBox}>
                    <TouchableOpacity
                        onPress={props.onOpenAccordion}
                        accessibilityLabel="Competency-Pillar-Button"
                    >
                        <View
                            style={
                                props.openKey === props.pillar.id
                                    ? {
                                          ...styles.listHead,
                                          ...{
                                              borderBottomLeftRadius: 0,
                                              borderBottomRightRadius: 0
                                          }
                                      }
                                    : styles.listHead
                            }
                        >
                            {mapPillarIcon(props.pillar.code)}
                            <View style={styles.listHeadTextIconContainer}>
                                <Text style={styles.listHeadText}>
                                    {props.pillar.title}
                                </Text>
                                {props.openKey !== props.pillar.id && (
                                    <Entypo
                                        name="chevron-down"
                                        size={24}
                                        color="white"
                                        style={styles.listHeadIcon}
                                    />
                                )}
                                {props.openKey === props.pillar.id && (
                                    <Entypo
                                        name="chevron-up"
                                        size={24}
                                        color="white"
                                        style={styles.listHeadIcon}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    {props.openKey === props.pillar.id && (
                        <View style={styles.listSub}>
                            {props.pillar.subdomains.map(
                                (subdomain: Subdomain, key: number) => (
                                    <View key={key}>
                                        {key !== 0 && (
                                            <View
                                                style={styles.separator}
                                            ></View>
                                        )}
                                        <TouchableOpacity
                                            accessibilityLabel="Competency-Subdomain-Button"
                                            onPress={() =>
                                                props.navigation.navigate(
                                                    'CompetencyList',
                                                    {
                                                        subdomainId:
                                                            subdomain.id,
                                                        subdomainTitle:
                                                            subdomain.title
                                                    }
                                                )
                                            }
                                        >
                                            <Text style={styles.listSubText}>
                                                {subdomain.title}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            )}
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    listBox: {
        marginTop: 14,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden'
    },
    listHead: {
        flexDirection: 'row',
        backgroundColor: Colors.accordionHeadColor,
        paddingHorizontal: 20,
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 15
    },
    listHeadSymbol: {
        height: 40,
        width: 40
    },
    listHeadTextIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listHeadText: {
        fontSize: 16,
        fontFamily: 'ibm-semibold',
        letterSpacing: 0.3,
        color: 'white',
        alignItems: 'flex-start',
        flexShrink: 1,
        marginLeft: 10
    },
    listHeadIcon: {
        alignItems: 'flex-end'
    },
    listSub: {
        overflow: 'hidden',
        backgroundColor: Colors.accordionSubColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    listSubText: {
        padding: 20,
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'ibm-regular',
        color: Colors.accordionSubTextColor
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center'
    }
});

export default AccordionList;
