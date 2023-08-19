import { MILESTONE_STATUS, STUDENT_CARD_STATUS } from '../constants/TaskStatus';

const compareCompetencyStatus = (status: number): string | undefined => {
    switch (status) {
        case STUDENT_CARD_STATUS.SELECTED:
            return 'blue';
        case STUDENT_CARD_STATUS.IN_PROGRESS:
            return 'orange';
        case STUDENT_CARD_STATUS.COMPLETED:
            return 'green';
        case STUDENT_CARD_STATUS.ABANDONED:
            return 'red';
        default:
            return 'black';
    }
};

const compareMilestoneStatus = (status: number): string | undefined => {
    switch (status) {
        case MILESTONE_STATUS.ACTIVE:
            return 'blue';
        case MILESTONE_STATUS.COMPLETED:
            return 'green';
        case MILESTONE_STATUS.LATE:
            return 'red';
        case MILESTONE_STATUS.PLANNED:
            return 'orange';
        case MILESTONE_STATUS.DELETED:
            return 'gray';
        default:
            return 'black';
    }
};

export { compareCompetencyStatus, compareMilestoneStatus };
