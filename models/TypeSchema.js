const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLFloat,
    GraphQLSchema
} = require('graphql');


module.exports = {
    HistoryType: new GraphQLObjectType({
        name: 'History',
        fields: () => ({
            id: { type: GraphQLInt },
            title: { type: GraphQLString },
            flight_number: { type: GraphQLInt },
            event_date_utc: { type: GraphQLString },
            details: { type: GraphQLString },
            links: {
                type: new GraphQLObjectType({
                    name: 'History_Links',
                    fields: () => ({
                        article: { type: GraphQLString },
                        wikipedia: {type: GraphQLString}
                    })
                })
            }
        })
    }),

    InfoType: new GraphQLObjectType({
        name: 'Info',
        fields: () => ({
            name: { type: GraphQLString },
            founder: { type: GraphQLString },
            founded: { type: GraphQLInt },
            employees: { type: GraphQLInt },
            ceo: { type: GraphQLString },
            cto: { type: GraphQLString },
            coo: { type: GraphQLString },
            cto_propulsion: { type: GraphQLString },
            valuation: { type: GraphQLFloat },
            summary: { type: GraphQLString },
            headquarters: {
                type: new GraphQLObjectType({
                    name: 'Info_Headquarters',
                    fields: () => ({
                        address: { type: GraphQLString },
                        city: { type: GraphQLString },
                        state: { type: GraphQLString },
                    })
                })
            }
        })
    })
    ,
    LaunchType: new GraphQLObjectType({
        name: 'Launch',
        fields: () => ({
            flight_number: { type: GraphQLInt },
            mission_name: { type: GraphQLString },
            launch_year: { type: GraphQLString },
            launch_date_utc: { type: GraphQLString },
            launch_success: { type: GraphQLBoolean },
            details: { type: GraphQLString },
            upcoming: { type: GraphQLBoolean },
            rocket: {
                type: new GraphQLObjectType({
                    name: 'Launch_Rocket',
                    fields: () => ({
                        rocket_id: { type: GraphQLString },
                        rocket_name: { type: GraphQLString },
                        rocket_type: { type: GraphQLString }
                    })
                })
            },
            links: {
                type: new GraphQLObjectType({
                    name: 'Launch_Links',
                    fields: () => ({
                        article_link: { type: GraphQLString },
                        flickr_images: { type: new GraphQLList(GraphQLString) }
                    })
                })
            },
            launch_site: {
                type: new GraphQLObjectType({
                    name: 'Launch_LaunchSite',
                    fields: () => ({
                        site_name_long: { type: GraphQLString }
                    })
                })
            }
        })
    }),
    RocketType: new GraphQLObjectType({
        name: 'Rocket',
        fields: () => ({
            active: { type: GraphQLBoolean },
            cost_per_launch: { type: GraphQLInt },
            success_rate_pct: { type: GraphQLFloat },
            first_flight: { type: GraphQLString },
            wikipedia: { type: GraphQLString },
            description: { type: GraphQLString },
            rocket_id: { type: GraphQLString },
            rocket_name: { type: GraphQLString },
            height: {
                type: new GraphQLObjectType({
                    name: 'Rocket_Height',
                    fields: () => ({
                        meters: { type: GraphQLFloat },
                        feet: { type: GraphQLFloat },
                    })
                })
            },
            diameter: {
                type: new GraphQLObjectType({
                    name: 'Rocket_Diameter',
                    fields: () => ({
                        meters: { type: GraphQLFloat },
                        feet: { type: GraphQLFloat },
                    })
                })
            },
            mass: {
                type: new GraphQLObjectType({
                    name: 'Rocket_Mass',
                    fields: () => ({
                        kg: { type: GraphQLFloat },
                        lb: { type: GraphQLFloat },
                    })
                })
            }
        })
    }),

    RoadsterType: new GraphQLObjectType({
        name: 'Roadster',
        fields: () => ({
            name: { type: GraphQLString },
            launch_date_utc: { type: GraphQLString },
            speed_kph: { type: GraphQLFloat },
            speed_mph: { type: GraphQLFloat },
            earth_distance_km: { type: GraphQLFloat },
            earth_distance_mi: { type: GraphQLFloat },
            mars_distance_km: { type: GraphQLFloat },
            mars_distance_mi: { type: GraphQLFloat },
            wikipedia: { type: GraphQLString },
            details: { type: GraphQLString }
        })
    })
};
