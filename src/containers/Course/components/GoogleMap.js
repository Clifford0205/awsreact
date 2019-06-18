import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import GoogleMapReact from 'google-map-react'
import map_style from '../../Route/data/google_map_style'
// import Marker from './Marker'
const google = window.google
// import { withRouter } from 'react-router-dom'
// import {
//   addToChallengeSuccess,
//   addToLikeSuccess,
//   fetchSingleAsync,
//   handlelikeAsync,
// } from '../../Route/actions'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// const AnyReactComponent = ({ text }) => <div>{text}</div>

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.033711,
      lng: 121.543393,
    },
    zoom: 18,
  }

  componentDidUpdate() {
    // let GoogleMapDiv = new google.maps.Map(
    //   document.getElementById('GoogleMapDiv'),
    //   {
    //     zoom: 4,
    //     center: { lat: 25.04776, lng: 121.53185 },
    //     styles: map_style,
    //   }
    // )
  }

  // initMap = () => {
  //   // The location of Taipei
  //   let taipei = { lat: 25.04776, lng: 121.53185 };
  //   // The map, centered at Taipei
  //   let map = new google.maps.Map(
  //     document.getElementById('GoogleMapDiv'), {zoom: 4, center: taipei});
  //   // The marker, positioned at Taipei
  //   let marker = new google.maps.Marker({position: taipei, map: map});
  // }

  render() {
    return (
      // Important! Always set the container height explicitly
      <Container
        fluid
        className="p-0 m-0"
        style={{ height: '100%', width: '100%' }}
        id="GoogleMapDiv"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          // style={map_style}
          // style={style}
        >
        {/*<AnyReactComponent lat={25.033711} lng={121.543393} text="資策會" />*/}
        {/*<FontAwesomeIcon*/}
        {/*  icon={faMapPin}*/}
        {/*  size="6x"*/}
        {/*  style={{ color: '#ff0000' }}*/}
        {/*/>*/}
        </GoogleMapReact>
        {/*<Marker lat={this.props.center.lat} lng={this.props.center.lng} />*/}
      </Container>
    )
  }
}

// const mapStateToProps = store => ({
// //   r: store.routeSingleReducer,
// //   a: store.alertReducer,
// //   h: store.likeRouteReducer,
// // })
// //
// // const mapDispatchToProps = dispatch =>
// //   bindActionCreators(
// //     {
// //       fetchSingleAsync,
// //       handlelikeAsync,
// //       addToLikeSuccess,
// //       addToChallengeSuccess,
// //     },
// //     dispatch
// //   )

export default SimpleMap
// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(SimpleMap)
// )
