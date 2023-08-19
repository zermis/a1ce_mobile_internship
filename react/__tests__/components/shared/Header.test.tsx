import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';
import Header from '../../../src/components/shared/Header';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Header>
                <View>
                    <Text>Hello World</Text>
                </View>
            </Header>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
