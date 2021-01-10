import React, { Component, Fragment } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { formatNumber } from "../utility"
import Loading from "../components/Loading"
import Error from "../components/Error"
import SpaceXLogo from "../components/SpaceXLogo"

const INFO_QUERY = gql`
  query InfoQuery {
    info {
      name
      founder
      founded
      employees
      ceo
      cto
      coo
      cto_propulsion
      valuation
      summary
      headquarters {
        address
        city
        state
      }
    }
  }
`

class Info extends Component {
  componentDidMount() {
    document.title = "Info | SpaceX API View"
  }

  render() {
    return (
      <Query query={INFO_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          if (data.info) {
            const info = data.info
            const keyPeopleRender = [
              { key: "CEO", value: info.ceo },
              { key: "CTO", value: info.cto },
              { key: "COO", value: info.coo },
              { key: "CTO Propulsion", value: info.cto_propulsion },
            ]
            return (
              <Fragment>
                <div className="jumbotron bg-dark text-light text-center py-4">
                  <div className="mb-4">
                    <SpaceXLogo width={300} />
                  </div>
                  <p className="lead">{info.summary}</p>
                  <hr className="my-4 bg-light" />
                  <p className="lead">
                    {info.name} was founded by {info.founder} in {info.founded},
                    it currently has ~{formatNumber(info.employees)} employees
                    and an estimated valuation of $
                    {formatNumber(info.valuation)}.
                  </p>
                </div>
                <h3 className="text-center">Key People</h3>
                <div className="container">
                  <div className="row bg-dark text-white mb-4">
                    {keyPeopleRender.map((keyPeople, index) => (
                      <div
                        className="col-sm-6 col-md-3 pt-2 border-right border-bottom"
                        key={`keyPeople${index}`}
                      >
                        <p className="mb-0">{keyPeople.key}</p>
                        <p>
                          <strong>{keyPeople.value}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-center">Location</h3>
                <div className="container bg-dark text-center py-3 mb-3">
                  <h5 className="text-light">
                    <i className="fas fa-map-marker-alt mr-2"></i> Headquarters
                  </h5>
                  <h4 className="text-light">
                    {info.headquarters.address}, {info.headquarters.city},{" "}
                    {info.headquarters.state}
                  </h4>
                  <div className="container-fluid">
                    <div
                      style={{
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1655.3909253652128!2d-118.3281537!3d33.9210137!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b5dee46db32d%3A0x5589bf4232c10232!2sSpaceX!5e0!3m2!1sen!2smy!4v1551366586581"
                        title="Google Map - SpaceX Headquarters"
                        style={{
                          width: "600px",
                          height: "450px",
                          frameborder: 0,
                          border: 0,
                        }}
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </Fragment>
            )
          } else return <Error />
        }}
      </Query>
    )
  }
}

export default Info
