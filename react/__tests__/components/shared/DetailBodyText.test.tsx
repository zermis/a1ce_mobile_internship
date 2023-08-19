import DetailBodyText from '../../../src/components/shared/DetailBodyText';
import renderer from 'react-test-renderer';

it('render detail body text correctly', () => {
    const tree = renderer
        .create(<DetailBodyText>{`This is a test`}</DetailBodyText>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
