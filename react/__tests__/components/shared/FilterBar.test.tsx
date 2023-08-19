import FilterBar from '../../../src/components/shared/FilterBar';
import renderer from 'react-test-renderer';

it('render filter bar correctly', () => {
    const tree = renderer
        .create(<FilterBar filterMenu={[]} onPress={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
