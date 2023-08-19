import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../src/constants/Colors';
import { PILLAR_ICON } from '../../src/constants/PillarIcon';
import mapPillarIcon from '../../src/utils/MapPillarIcon';

type inputType = string;
type outputType = JSX.Element;

const UNKNOWN_CODE = 'UNKNOWN_CODE';
const cases: [inputType, outputType][] = [
    [
        PILLAR_ICON.AICORE,
        <MaterialCommunityIcons
            name="webhook"
            size={36}
            color={Colors.pillarIcon}
        />
    ],
    [
        PILLAR_ICON.HUMAN,
        <MaterialCommunityIcons
            name="human-greeting"
            size={36}
            color={Colors.pillarIcon}
        />
    ],
    [
        PILLAR_ICON.SYSTEMS,
        <MaterialIcons name="handyman" size={36} color={Colors.pillarIcon} />
    ],
    [
        PILLAR_ICON.SECURE,
        <MaterialCommunityIcons
            name="shield-key"
            size={36}
            color={Colors.pillarIcon}
        />
    ],
    [
        PILLAR_ICON.MATH,
        <MaterialIcons name="calculate" size={36} color={Colors.pillarIcon} />
    ],
    [
        PILLAR_ICON.SCIENCE,
        <MaterialIcons name="science" size={36} color={Colors.pillarIcon} />
    ],
    [
        PILLAR_ICON.INNOV,
        <MaterialIcons name="lightbulb" size={36} color={Colors.pillarIcon} />
    ],
    [
        PILLAR_ICON.AHSS,
        <MaterialCommunityIcons
            name="earth"
            size={36}
            color={Colors.pillarIcon}
        />
    ],
    [
        PILLAR_ICON.COMM,
        <MaterialIcons name="people" size={36} color={Colors.pillarIcon} />
    ],
    [
        UNKNOWN_CODE,
        <MaterialCommunityIcons
            name="file-document"
            size={36}
            color={Colors.pillarIcon}
        />
    ]
];

describe('should return pillar icon correctly', () => {
    test.each(cases)(
        'given %p as arguments, returns %p as expected',
        (arugment, expectedResult) => {
            const result = mapPillarIcon(arugment);
            expect(result).toEqual(expectedResult);
        }
    );
});
