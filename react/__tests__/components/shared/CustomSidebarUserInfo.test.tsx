import CustomSidebarUserInfo from '../../../src/components/sidebar/CustomSidebarUserInfo';
import renderer from 'react-test-renderer';

it('renders custom sidebar user info correctly', function () {
    var tree = renderer
        .create(
            <CustomSidebarUserInfo
                userName={''}
                userEmail={''}
                userStudentID={''}
                userProfile={''}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
