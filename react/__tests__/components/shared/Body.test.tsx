import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import Body from '../../../src/components/shared/Body';

it('render body with items', () => {
    const tree = renderer
        .create(
            <Body>
                <View>
                    <Text>Hello World</Text>
                </View>
            </Body>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
