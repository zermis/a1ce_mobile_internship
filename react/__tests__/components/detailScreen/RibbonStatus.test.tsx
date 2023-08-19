import RibbonStatus from '../../../src/components/detailScreen/RibbonStatus';
import renderer from 'react-test-renderer';

it('renders ribbon correctly', () => {
    const tree = renderer.create(<RibbonStatus status={0} />).toJSON();
    expect(tree).toMatchSnapshot();
});
