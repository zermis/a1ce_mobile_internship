import DetailUnorderedListText from '../../../src/components/shared/DetailUnorderedListText';
import renderer from 'react-test-renderer';
import React from 'react';

it('render detail unordered list text correctly', function () {
    var tree = renderer
        .create(<DetailUnorderedListText relatedCompetencies={[]} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
//
