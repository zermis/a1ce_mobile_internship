import renderer from 'react-test-renderer';
import LoadingOverlay from '../../../src/components/shared/LoadingOverlay';

it('render loading overlay', () => {
    const tree = renderer.create(<LoadingOverlay />).toJSON();
    expect(tree).toMatchSnapshot();
});
