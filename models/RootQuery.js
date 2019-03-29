const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');
const {
    HistoryType,
    InfoType,
    LaunchType,
    RocketType,
    RoadsterType
} = require('./TypeSchema.js');

function axiosGet(path, arg) {
    const argInsert = arg? `/${arg}` : '';
    return axios.get(`https://api.spacexdata.com/v3/${path}${argInsert}`)
        .then(res => res.data)
        .catch(err => console.log(err))
};

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        histories: {
            type: new GraphQLList(HistoryType),
            resolve(parent, args) {
                return axiosGet('history');
            }
        },
        history_latest: {
            type: HistoryType,
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/history?order=desc&limit=1')
                    .then(res => res.data[0])
                    .catch(err => console.log(err));
            }
        },
        info: {
            type: InfoType,
            resolve(parent, args) {
                return axiosGet('info');
            }
        },
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axiosGet('launches');
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axiosGet('launches', args.flight_number);
            }
        },
        launch_latest: {
            type: LaunchType,
            resolve(parent, args) {
                return axiosGet('launches','latest');
            }
        },
        launch_next: {
            type: LaunchType,
            resolve(parent, args) {
                return axiosGet('launches', 'next');
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axiosGet('rockets');
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axiosGet('rockets', args.rocket_id);
            }
        },
        roadster: {
            type: RoadsterType,
            resolve(parent, args) {
                return axiosGet('roadster');
            }
        }
    }
});

module.exports = RootQuery;