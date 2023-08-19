import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Modal,
    Dimensions,
    Text
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import AccordionList from '../../components/competency/AccordionList';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import TokenKey from '../../constants/TokenKey';
import PageContainer from '../../containers/PageContainer';
import ErrorOverlay from '../../components/shared/ErrorOverlay';
import LoadingOverlay from '../../components/shared/LoadingOverlay';
import ERROR_MESSAGE from '../../constants/ErrorMessage';
import { Pillar } from '../../models/Subdomain';
import {
    StorageRecordData,
    SaveItem,
    GetItem
} from '../../utils/LocalAsyncStorage';
import * as CompetencyService from '../../services/Competency';
import { AppDispatch, RootState } from '../../stores/Store';
import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import * as UserAction from '../../stores/actions/User';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const { width, height } = Dimensions.get('window');

const CompetencyScreen = (props: Props): JSX.Element => {
    const [openKey, setOpenKey] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pillar, setPillar] = useState<Pillar[]>([]);
    const [infoButtonIsActive, setInfoButtonIsActive] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const connectionStatus = useSelector(
        (state: RootState) => state.user.connectionMode
    );

    const toggleInfoButton = () => setInfoButtonIsActive(!infoButtonIsActive);

    const onOpenAccordion = (key: number | null) => {
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
                springDamping: 0.7
            }
        });
        setOpenKey(openKey !== key ? key : null);
    };

    const saveDataIntoStorage = (pillarData: Pillar[]): void => {
        const pillarStorage: StorageRecordData = {
            key: TokenKey.competencyPillar,
            data: pillarData
        };

        void SaveItem(pillarStorage);
    };

    const fetchPillar = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.OFFLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.ONLINE)
            );
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const resData =
                (await CompetencyService.getPillar()) || ([] as Pillar[]);

            setPillar(resData);
            saveDataIntoStorage(resData);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.ONLINE_FETCHING_ERROR);
        }
        setIsLoading(false);
    }, [setPillar, setIsLoading, setError, connectionStatus]);

    const fetchPillarOffline = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.OFFLINE)
            );
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const pillarData = await GetItem(TokenKey.competencyPillar);
            setPillar(pillarData || []);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.OFFLINE_FETCHING_ERROR);
        }

        setIsLoading(false);
    }, [setPillar, setIsLoading, setError, connectionStatus]);

    useEffect(() => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            void fetchPillar();
        } else {
            void fetchPillarOffline();
        }
    }, [fetchPillar, connectionStatus]);

    const headerContent = (
        <View style={styles.headerTitleView}>
            <DefaultMainHeader>Competency</DefaultMainHeader>
            <TouchableOpacity
                style={styles.infoButton}
                onPress={toggleInfoButton}
            >
                <Feather name="info" size={20} color="white" />
            </TouchableOpacity>
            <View>
                <Modal
                    transparent={true}
                    visible={infoButtonIsActive}
                    statusBarTranslucent={true}
                    onRequestClose={() => setInfoButtonIsActive(false)}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setInfoButtonIsActive(false)}
                    >
                        <View style={styles.blurredArea} />
                    </TouchableWithoutFeedback>
                    <View style={styles.infoContainer}>
                        {infoButtonIsActive && (
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>
                                    Description
                                </Text>
                                <Text style={styles.infoDescription}>
                                    A competency is a collection of skills
                                    associated with a specific subject. To
                                    complete each subject successfully, the user
                                    must first demonstrate mastery of the
                                    prerequisite skills.
                                </Text>
                            </View>
                        )}
                    </View>
                </Modal>
            </View>
        </View>
    );

    const bodyContent = error ? (
        <ErrorOverlay
            message={error}
            onPressTryAgain={() => void fetchPillar()}
            onPressOffline={() => void fetchPillarOffline()}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <ScrollView
            contentContainerStyle={styles.screen}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
        >
            {pillar?.map((pillar: Pillar) => (
                <AccordionList
                    key={pillar.id}
                    pillar={pillar}
                    navigation={props.navigation}
                    onOpenAccordion={() => onOpenAccordion(pillar.id)}
                    openKey={openKey}
                />
            ))}
        </ScrollView>
    );

    return (
        <PageContainer
            isMain={true}
            headerContent={headerContent}
            bodyContent={bodyContent}
            accessibilityLabel="Competency-Screen"
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingTop: 17,
        paddingBottom: 17
    },
    infoButton: {
        marginLeft: 10
    },
    headerTitleView: {
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '69%'
    },
    infoBox: {
        width: width * 0.6,
        borderRadius: 15,
        height: 100,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        justifyContent: 'center',
        padding: 10
    },
    infoDescription: {
        textAlign: 'center',
        fontSize: 10,
        color: Colors.textBody
    },
    infoTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primaryTextColor,
        marginBottom: 7
    },
    blurredArea: {
        height: '100%',
        opacity: 0.7,
        backgroundColor: 'black'
    }
});

export default CompetencyScreen;
