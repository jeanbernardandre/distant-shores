import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";
import './DioraMaps.css';
import {ADDRESS_V2} from '../../constants';
import {CATEGORIE_DIORAMA} from '../../constants';
import {Link, BrowserRouter as Router} from 'react-router-dom';
const demoFancyMapStyles = require("./fancyMapsStyle.json");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const uuidv1 = require('uuid/v1');

/* global google */


class DioraMaps extends Component {

  constructor() {
    super();
    this.state = {
      dioramas: {
        title: {
          rendered: ''
        },
        content: {
          rendered: ''
        },
        acf: {
          gmapes: {
            lng:'',
            lat:'',
          }
        }
      },
      isOpen: false,
    }
      this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(){
    this.setState({ loading: true });
    let pageurl = ADDRESS_V2 + "posts/?categories=" + CATEGORIE_DIORAMA;
    fetch (pageurl)
    .then(response => response.json())
    .then(response => {
        this.setState({
          dioramas:response,
          loading:false,
        })
      })
  }

    handleSearch(val) {
        window.location = '/Diora/' + val;
    }

render() {
  let {dioramas} = this.state;
 // alert(window.google);
  const renderedMarkers = (dioramas && dioramas.length > 0) && (window.google !== 'undefined')
      ? dioramas
        .map(diorama => {
          if (diorama.acf.gmapes.lat !== 'undefined') {
              const test = JSON.parse(diorama.acf.gmapes.lat);
              const test2 = JSON.parse(diorama.acf.gmapes.lng);
          }
 }): null;

    const MyMapComponent =  withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom = {3}
        defaultCenter = {{ lat: 42.43641197821332, lng: 3.1731390953063965 }}
        defaultOptions = {{ styles: demoFancyMapStyles }}
      >
        <React.Fragment>
          {renderedMarkers}
        </React.Fragment>
      </GoogleMap>
    ))

    return(
        <MyMapComponent
          isMarkerShown
          googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDnfy_2g_YHgR4rV32YhFsw4esodBM15y0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement = {<div style={{height: `100%`}} />}
          containerElement = {<div style={{height: `600px`}} />}
          mapElement = {<div style={{height: `100%`}} />}
        />
    )
  }
}

export default DioraMaps;
