import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Modal,
    ScrollView
} from 'react-native';
import Timeline from './Timeline';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import EmptyItem from '../shared/EmptyItem';
import Colors from '../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import { Roadmap } from '../../models/Roadmap';
import { FormatYearSemester } from '../../models/UniversitySemester';

interface Props {
    roadmap: Roadmap;
    semester: FormatYearSemester;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    selectedYear: string;
    selectedSemester: string;
    isMilestonePage: boolean;
    setSelectedYear: (year: string) => void;
    setSelectedSemester: (semester: string) => void;
}

const height = Dimensions.get('window').height;

const MilestoneTimeline = (props: Props) => {
    const [dropdownIsActive, setDropdownIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const selectedYear = props.selectedYear;
    const selectedSemester = props.selectedSemester;
    const semesterData = props.semester;
    const isRoadmapEmpty = Object.keys(props.roadmap).length === 0;

    const clickMonthYearHandler = () => {
        setDropdownIsActive(true);
        setIsVisible(true);
    };

    const toggleDropdown = () => {
        dropdownIsActive ? setDropdownIsActive(false) : clickMonthYearHandler();
        isVisible ? setIsVisible(true) : clickMonthYearHandler();
    };

    const timelineContent =
        !selectedYear || !selectedSemester ? (
            <View />
        ) : !isRoadmapEmpty ? (
            <View style={styles.timeline}>
                <Timeline
                    roadmap={props.roadmap}
                    navigation={props.navigation}
                    isMilestonePage={props.isMilestonePage}
                />
            </View>
        ) : (
            <View style={styles.noItem}>
                <Text style={styles.emptyEventTextWelldone}>Well Done!</Text>
                <EmptyItem header="Your milestone is empty in this semester." />
            </View>
        );

    return (
        <View style={styles.component}>
            <TouchableOpacity style={styles.card} onPress={toggleDropdown}>
                <View style={styles.cardContent}>
                    <Text style={styles.selectedDate}>
                        {selectedYear
                            ? `${selectedSemester} ${moment(
                                  selectedYear
                              ).format('YYYY')}`
                            : 'Please select year & semester'}
                    </Text>
                    {!dropdownIsActive && (
                        <Entypo
                            name="chevron-down"
                            size={24}
                            color={Colors.primaryTextColor}
                        />
                    )}
                    {dropdownIsActive && (
                        <Entypo
                            name="chevron-up"
                            size={24}
                            color={Colors.primaryTextColor}
                        />
                    )}
                </View>
            </TouchableOpacity>
            <View style={styles.monthYearContainer}>
                <Modal
                    transparent={true}
                    visible={dropdownIsActive}
                    onRequestClose={() => setDropdownIsActive(false)}
                    statusBarTranslucent={true}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setDropdownIsActive(false)}
                    >
                        <View style={styles.blurredArea} />
                    </TouchableWithoutFeedback>
                    <View style={styles.monthYearPicker}>
                        {dropdownIsActive && isVisible && (
                            <View style={styles.viewContainer}>
                                <View style={[styles.header, styles.shadow]}>
                                    <Text style={styles.headerTitle}>
                                        Please select year & semester
                                    </Text>
                                </View>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    alwaysBounceVertical={false}
                                    contentContainerStyle={
                                        styles.scrollViewContainer
                                    }
                                >
                                    <View style={styles.dropdownsRow}>
                                        <SelectDropdown
                                            data={semesterData.years}
                                            onSelect={(selectedItem) => {
                                                props.setSelectedYear(
                                                    selectedItem
                                                );
                                                props.setSelectedSemester('');
                                            }}
                                            defaultButtonText={
                                                selectedYear || 'Year'
                                            }
                                            buttonTextAfterSelection={(
                                                selectedItem
                                            ) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item) => {
                                                return item;
                                            }}
                                            buttonStyle={
                                                styles.dropdown1BtnStyle
                                            }
                                            buttonTextStyle={
                                                styles.dropdown1BtnTxtStyle
                                            }
                                            renderDropdownIcon={(isOpened) => {
                                                return (
                                                    <Entypo
                                                        name={
                                                            isOpened
                                                                ? 'chevron-up'
                                                                : 'chevron-down'
                                                        }
                                                        color={'#444'}
                                                        size={18}
                                                    />
                                                );
                                            }}
                                            dropdownIconPosition={'right'}
                                            dropdownStyle={
                                                styles.dropdown1DropdownStyle
                                            }
                                            rowStyle={styles.dropdown1RowStyle}
                                            rowTextStyle={
                                                styles.dropdown1RowTxtStyle
                                            }
                                            statusBarTranslucent={true}
                                        />
                                        <View style={styles.divider} />
                                        <SelectDropdown
                                            data={
                                                semesterData.semesters[
                                                    selectedYear
                                                ]
                                            }
                                            onSelect={(selectedItem) => {
                                                props.setSelectedSemester(
                                                    selectedItem
                                                );

                                                setIsVisible(false);
                                                setDropdownIsActive(false);
                                            }}
                                            defaultButtonText={
                                                selectedSemester || 'Semester'
                                            }
                                            buttonTextAfterSelection={(
                                                selectedItem
                                            ) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item) => {
                                                return item;
                                            }}
                                            buttonStyle={
                                                styles.dropdown2BtnStyle
                                            }
                                            buttonTextStyle={
                                                styles.dropdown2BtnTxtStyle
                                            }
                                            renderDropdownIcon={(isOpened) => {
                                                return (
                                                    <Entypo
                                                        name={
                                                            isOpened
                                                                ? 'chevron-up'
                                                                : 'chevron-down'
                                                        }
                                                        color={'#444'}
                                                        size={18}
                                                    />
                                                );
                                            }}
                                            dropdownIconPosition={'right'}
                                            dropdownStyle={
                                                styles.dropdown2DropdownStyle
                                            }
                                            rowStyle={styles.dropdown2RowStyle}
                                            rowTextStyle={
                                                styles.dropdown2RowTxtStyle
                                            }
                                            statusBarTranslucent={true}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </Modal>
            </View>
            {timelineContent}
        </View>
    );
};

MilestoneTimeline.defaultProps = {
    milestones: [],
    isMilestonePage: true
};

const styles = StyleSheet.create({
    component: {
        flex: 1
    },
    selectedDate: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.primaryTextColor
    },
    containerStyle: {
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    cardShadow: {
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    monthYearContainer: {
        flex: 1,
        position: 'absolute'
    },
    monthYearPicker: {
        position: 'absolute',
        width: '95%',
        top: 0.247 * height,
        paddingLeft: 19
    },
    card: {
        borderRadius: 10,
        height: 50,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginTop: 20
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 19,
        paddingRight: 19
    },
    milestoneTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 100,
        marginTop: 10
    },
    picker: {
        fontSize: 40,
        fontWeight: 'bold',
        backgroundColor: 'white',
        position: 'relative',
        top: '15%'
    },
    blurredArea: {
        height: '100%',
        opacity: 0.7,
        backgroundColor: 'black'
    },
    timeline: {
        right: '7%',
        marginTop: 10
    },
    emptyEventTextWelldone: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.primaryTextColor
    },
    noItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 15
    },
    headerTitle: {
        color: Colors.primaryTextColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    viewContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignContent: 'center'
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10%'
    },
    dropdownsRow: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%'
    },

    dropdown1BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444'
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 5 },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
    divider: { width: 12 },
    dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444'
    },
    dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
    dropdown2DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 5 },
    dropdown2RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown2RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 }
});

export default MilestoneTimeline;
