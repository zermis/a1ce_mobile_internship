import DetailLinkText from '../../../src/components/shared/DetailLinkText';
import renderer from 'react-test-renderer';

it('render detail link text correctly', () => {
    const tree = renderer
        .create(<DetailLinkText>{'Link is here'}</DetailLinkText>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
