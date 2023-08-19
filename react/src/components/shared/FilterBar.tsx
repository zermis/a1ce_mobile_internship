import React from 'react';
import SwitchSelector, {
    ISwitchSelectorOption
} from 'react-native-switch-selector';
import Colors from '../../constants/Colors';

interface Props {
    filterMenu: ISwitchSelectorOption[];
    onPress: (value: string | number | ISwitchSelectorOption) => void;
    borderColor?: string;
    buttonColor?: string;
    textColor?: string;
    style?: any;
}

const FilterBar = (props: Props): JSX.Element => {
    return (
        <SwitchSelector
            options={props.filterMenu}
            initial={0}
            onPress={(value: string | number) => {
                props.onPress(value);
            }}
            borderColor={props.borderColor}
            buttonColor={props.buttonColor}
            textColor={props.textColor}
            fontSize={14}
            height={30}
            hasPadding
            style={props.style}
            animationDuration={110}
        />
    );
};

FilterBar.defaultProps = {
    borderColor: Colors.filterSelectorColor,
    buttonColor: Colors.filterSelectorColor,
    textColor: Colors.filterSelectorColor,
    style: { width: '100%' }
};

export default FilterBar;
