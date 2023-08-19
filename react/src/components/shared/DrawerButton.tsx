import React from 'react';
import {
    HeaderButton,
    HeaderButtonProps,
    HeaderButtons,
    Item
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
}

const CustomHeaderButton = (
    props: HeaderButtonProps | Readonly<HeaderButtonProps>
) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconName="ios-menu"
            iconSize={45}
            color="white"
        />
    );
};

const DrawerButton = (props: Props) => {
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" onPress={props.onPress} />
        </HeaderButtons>
    );
};

export default DrawerButton;
