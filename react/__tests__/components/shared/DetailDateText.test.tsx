import DetailDateText from '../../../src/components/shared/DetailDateText';
import renderer from 'react-test-renderer';

it('render detail date text correctly', () => {
    const tree = renderer
        .create(<DetailDateText header="header" body="body" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
