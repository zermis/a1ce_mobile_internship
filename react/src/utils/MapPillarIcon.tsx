import React from 'react';
import { PILLAR_ICON } from '../constants/PillarIcon';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const mapPillarIcon = (pillar: string): JSX.Element | undefined => {
    switch (pillar) {
        case PILLAR_ICON.AICORE:
            return (
                <MaterialCommunityIcons
                    name="webhook"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.HUMAN:
            return (
                <MaterialCommunityIcons
                    name="human-greeting"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.SYSTEMS:
            return (
                <MaterialIcons
                    name="handyman"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.SECURE:
            return (
                <MaterialCommunityIcons
                    name="shield-key"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.MATH:
            return (
                <MaterialIcons
                    name="calculate"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.SCIENCE:
            return (
                <MaterialIcons
                    name="science"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.INNOV:
            return (
                <MaterialIcons
                    name="lightbulb"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.AHSS:
            return (
                <MaterialCommunityIcons
                    name="earth"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        case PILLAR_ICON.COMM:
            return (
                <MaterialIcons
                    name="people"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
        default:
            return (
                <MaterialCommunityIcons
                    name="file-document"
                    size={36}
                    color={Colors.pillarIcon}
                />
            );
    }
};

export default mapPillarIcon;
