import PageContainer from '../../../src/containers/PageContainer';
import renderer from 'react-test-renderer';

it('renders page container correctly', () => {
    const tree = renderer.create(<PageContainer isMain={false} />).toJSON();
    expect(tree).toMatchSnapshot();
});
