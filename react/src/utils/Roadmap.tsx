import { Roadmap } from '../models/Roadmap';

export const FilterRoadmap = (
    roadmap: Roadmap[],
    year: string,
    semester: string
): Roadmap => {
    if (!year || !semester) {
        return {} as Roadmap;
    }
    const filteredRoadmap = roadmap.filter((item) => {
        return (
            item.year === parseInt(year) &&
            item.semester === `${semester} ${year}`
        );
    });

    return filteredRoadmap.length > 0 ? filteredRoadmap[0] : ({} as Roadmap);
};
