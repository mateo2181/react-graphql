import { GET_AUTHORS } from '../queries/authors';

const mocks = [
    {
        request: {
            query: GET_AUTHORS,
            variables: { offset: 0, limit: 10 }
        },
        result: {
            data: {
                authors: [
                    { id: 1, firstName: 'mateo', lastName: 'merlo' }
                ]
            }
        }
    }
];

export default mocks;