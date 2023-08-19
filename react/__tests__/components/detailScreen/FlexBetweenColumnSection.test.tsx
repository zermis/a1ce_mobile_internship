import FlexBetweenColumnSection from '../../../src/components/detailScreen/FlexBetweenColumnSection';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

it('render flex between column section correctly', () => {
    const tree = renderer
        .create(
            <FlexBetweenColumnSection
                header="Header"
                body={<Text>Body</Text>}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
