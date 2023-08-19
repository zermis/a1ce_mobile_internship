import {
    compareCompetencyStatus,
    compareMilestoneStatus
} from '../../src/utils/SelectedColorStatus';
import {
    MILESTONE_STATUS,
    STUDENT_CARD_STATUS
} from '../../src/constants/TaskStatus';

type inputType = number;
type outputType = string | undefined;

const UNKNOWN_STATUS = 100000;
const competencyCases: [inputType, outputType][] = [
    [STUDENT_CARD_STATUS.SELECTED, 'blue'],
    [STUDENT_CARD_STATUS.IN_PROGRESS, 'orange'],
    [STUDENT_CARD_STATUS.COMPLETED, 'green'],
    [STUDENT_CARD_STATUS.ABANDONED, 'red'],
    [UNKNOWN_STATUS, 'black']
];

const milestoneCases: [inputType, outputType][] = [
    [MILESTONE_STATUS.ACTIVE, 'blue'],
    [MILESTONE_STATUS.COMPLETED, 'green'],
    [MILESTONE_STATUS.LATE, 'red'],
    [MILESTONE_STATUS.PLANNED, 'orange'],
    [MILESTONE_STATUS.DELETED, 'gray'],
    [UNKNOWN_STATUS, 'black']
];

describe('should return status color correctly', () => {
    test.each(competencyCases)(
        'given %p as arguments, returns %p as expected',
        (arugment, expectedResult) => {
            const result = compareCompetencyStatus(arugment);
            expect(result).toEqual(expectedResult);
        }
    );
    test.each(milestoneCases)(
        'given %p as arguments, returns %p as expected',
        (arugment, expectedResult) => {
            const result = compareMilestoneStatus(arugment);
            expect(result).toEqual(expectedResult);
        }
    );
});
