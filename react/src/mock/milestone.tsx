import { Roadmap } from '../models/Roadmap';
import { UniversitySemester } from '../models/UniversitySemester';

export const ROADMAP_MOCK: Roadmap[] = [
    {
        id: 'caa3 e10f—2cf2-a549-e7491e0ccc31',
        year: 2022,
        semester: 'Fall 2022',
        student: 'e10fcaa3-2cf2-4673-a549-e7491e0ccc31',
        milestones: [
            {
                id: '64b4d2-d934a418-540f-46c6-988c-4c40b6',
                title: 'Programming',
                description: 'Earn competency card for Programming',
                status_val: 1,
                status: 'Active',
                created: '2022-08-03 10:20',
                target_completion_date: '2022-10-15',
                actual_completion_date: null,
                competency_card: {
                    id: '7809-4f37-62ac72e8-bf25-2a1f738d2da5',
                    template_id: '62ac72e8-8d2da5-1111-ab123-7888',
                    title: 'Programming',
                    description:
                        'Designing, implementing and testing solutions to problems using a formal computer programming lanaguage',
                    required: true,
                    credits: 6,
                    status_val: 2,
                    status: 'In progress',
                    mastery_level: 0,
                    skills: [
                        {
                            id: 'd8c04164-d2f7-42d0-9c0d-dc421f217611',
                            title: 'Creating conditional structures',
                            description:
                                'Using conditional structures such as “if”, “else” or “switch” to control program flow',
                            required: true,
                            assessment: {
                                id: '97e25b8e-1ae4-45df-900d-45dfb3c76601',
                                title: 'Using conditionals',
                                description:
                                    'Write a non-trivial program based on a written specification that uses conditional logic to control processing',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://cmkl.ac.th/assignment1234444.html'
                            }
                        },
                        {
                            id: '62ac72e8-bf25-7809-4f37-2a1f738d2da5',
                            title: 'Creating iteration structures',
                            description:
                                'Using while, for or other structures to repeat operations',
                            required: true,
                            assessment: {
                                id: '14467073-662d3318-2b7ea44a-4dfd-a7f7',
                                title: 'Using loops',
                                description:
                                    'Write a non-trivial program based on a written specification that uses loop constructions',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://cmkl.ac.th/assignmentabc234.html'
                            }
                        },
                        {
                            id: '10ae-56a5ba5c-4287-85f0-348a5446269b',
                            title: 'Creating reusable code units',
                            description:
                                'Using functions, modules and packages',
                            required: true,
                            assessment: {
                                id: '56a5ba5c-10ae-4287-85f0-898assaeb69b',
                                title: 'Designing and using functions',
                                description:
                                    'Write a non-trivial program that uses functions, modules and (if relevant) packages to effectively distribute processing',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://tutorials.ac.th/functions.html'
                            }
                        }
                    ]
                }
            },
            {
                id: '64b4d2-d934a418-540f-46c6-988c-4c40b6',
                title: 'Programming',
                description: 'Earn competency card for Programming',
                status_val: 1,
                status: 'Active',
                created: '2022-08-03 10:20',
                target_completion_date: '2022-10-15',
                actual_completion_date: null,
                competency_card: {
                    id: '7809-4f37-62ac72e8-bf25-2a1f738d2da5',
                    template_id: '62ac72e8-8d2da5-1111-ab123-7888',
                    title: 'Programming',
                    description:
                        'Designing, implementing and testing solutions to problems using a formal computer programming lanaguage',
                    required: true,
                    credits: 6,
                    status_val: 2,
                    status: 'In progress',
                    mastery_level: 0,
                    skills: [
                        {
                            id: 'd8c04164-d2f7-42d0-9c0d-dc421f217611',
                            title: 'Creating conditional structures',
                            description:
                                'Using conditional structures such as “if”, “else” or “switch” to control program flow',
                            required: true,
                            assessment: {
                                id: '97e25b8e-1ae4-45df-900d-45dfb3c76601',
                                title: 'Using conditionals',
                                description:
                                    'Write a non-trivial program based on a written specification that uses conditional logic to control processing',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://cmkl.ac.th/assignment1234444.html'
                            }
                        },
                        {
                            id: '62ac72e8-bf25-7809-4f37-2a1f738d2da5',
                            title: 'Creating iteration structures',
                            description:
                                'Using while, for or other structures to repeat operations',
                            required: true,
                            assessment: {
                                id: '14467073-662d3318-2b7ea44a-4dfd-a7f7',
                                title: 'Using loops',
                                description:
                                    'Write a non-trivial program based on a written specification that uses loop constructions',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://cmkl.ac.th/assignmentabc234.html'
                            }
                        },
                        {
                            id: '10ae-56a5ba5c-4287-85f0-348a5446269b',
                            title: 'Creating reusable code units',
                            description:
                                'Using functions, modules and packages',
                            required: true,
                            assessment: {
                                id: '56a5ba5c-10ae-4287-85f0-898assaeb69b',
                                title: 'Designing and using functions',
                                description:
                                    'Write a non-trivial program that uses functions, modules and (if relevant) packages to effectively distribute processing',
                                result: 0,
                                assessment_time: null,
                                external_url:
                                    'https://tutorials.ac.th/functions.html'
                            }
                        }
                    ]
                }
            }
        ]
    }
];

export const SEMESTER_MOCK: UniversitySemester[] = [
    {
        id: '21c003ad-3902-4c93-9e22-7dc1968b74c6',
        semester_name: 'Spring 2023',
        university_name: 'CMKL University',
        university_code: 'CMKL',
        start_date: '2023-01-01',
        end_date: '2023-05-01',
        add_drop_date: '2023-02-01'
    },
    {
        id: 'c345b667-36b9-4926-b5f4-601e7a56fdfa',
        semester_name: 'Dummy',
        university_name: 'CMKL University',
        university_code: 'CMKL',
        start_date: '2022-06-01',
        end_date: '2022-07-01',
        add_drop_date: '2022-10-01'
    },
    {
        id: '82841766-7854-4da9-a4b9-a45a1c98c5c5',
        semester_name: 'Fall 2022',
        university_name: 'CMKL University',
        university_code: 'CMKL',
        start_date: '2022-08-01',
        end_date: '2022-12-01',
        add_drop_date: '2022-10-01'
    }
];
