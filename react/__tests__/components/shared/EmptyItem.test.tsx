import EmptyItem from '../../../src/components/shared/EmptyItem';
import renderer from 'react-test-renderer';

it('render empty item', () => {
    const tree = renderer.create(<EmptyItem header="No items" />).toJSON();
    expect(tree).toMatchSnapshot();
});
