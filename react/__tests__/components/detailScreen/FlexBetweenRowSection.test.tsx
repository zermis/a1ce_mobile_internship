import FlexBetweenRowSection from '../../../src/components/detailScreen/FlexBetweenRowSection';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

it('render flex between row section correctly', function () {
    var tree = renderer
        .create(
            <FlexBetweenRowSection header="Header" body={<Text>Body</Text>} />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
