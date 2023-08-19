import DefaultMainHeader from '../../../src/components/shared/DefaultMainHeader';
import renderer from 'react-test-renderer';

it('render default main header correctly', function () {
    var tree = renderer
        .create(<DefaultMainHeader children="Test" style={{}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
