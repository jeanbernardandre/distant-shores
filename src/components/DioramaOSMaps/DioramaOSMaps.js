import React, { Component } from 'react';
import './DioramaOSMaps.css';
import {ADDRESS_PAGES, ADDRESS_V2, CATEGORIE_DIORAMA, LOADER_COLOR, SECONDARY_COLOR, PAGE_MAPS} from '../../constants';
import {Link} from 'react-router-dom';
import {Map as LeafletMap, Marker, Popup , GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import worldGeoJSON from 'geojson-world-map';
import {RingLoader} from "react-spinners";

const DEFAULT_VIEWPORT = {
    center: [51.505, -0.09],
    zoom: 3,
}

class DioramaOSMaps extends Component {
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
                        lng: '',
                        lat: '',
                    }
                }
            },
            pageMaps: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                featured_media: {
                    rendered: ''
                }
            },
            isOpen: false,
            lat: 50.505,
            lng: 1,
            zoom: 3,
            viewport: DEFAULT_VIEWPORT,
            loadinMap: true,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    onClickReset = () => {
        this.setState({viewport: DEFAULT_VIEWPORT})
    }

    loadTxtpage = () => {
        this.setState({loading: true});
        let pageurl = ADDRESS_PAGES + PAGE_MAPS;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pageMaps: response,
                })
            })
            .catch(
                error => this.setState({
                    error
                })
            );
    };

    componentDidMount() {
        this.setState({
            loadingMap: true
        });
        this.loadTxtpage();

        let pageurl = ADDRESS_V2 + 'posts/?categories=' + CATEGORIE_DIORAMA;
/*        console.log('pageurl');
        console.log(pageurl);*/
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dioramas: response,
                    loadingMap: false,
                })
            })
    }

    handleSearch(val) {
        window.location = '/Diora/' + val;
    }

    render() {
        let {dioramas, pageMaps, loadingMap} = this.state;
        const iconPerson = new L.Icon({
            iconUrl: require('../../img/markerb.svg'),
            iconRetinaUrl: require('../../img/markerb.svg'),
            iconSize: new L.Point(10, 10),
            className: 'leaflet-div-icon'
        });

        if (loadingMap) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader color={LOADER_COLOR} loading={true}/>
                    </div>
                </div>
            )
        }

        const renderedMarkers = (dioramas && dioramas.length > 0) ? dioramas.map(diorama => {
                return (
                    <Marker icon={iconPerson} key={diorama.id} position={[diorama.acf.gmapes.lat, diorama.acf.gmapes.lng]}>
                        {diorama.title.rendered && <Popup>
                            <span><Link to = {`/Diora/${diorama.id}`}> {diorama.title.rendered}</Link></span>
                        </Popup>}
                    </Marker>
                )
            }): null;

        return (
            <div className="maps">
                <div key={pageMaps.id} className="header-galery-maps">
                    <h1 dangerouslySetInnerHTML={{
                        __html: pageMaps.title.rendered
                    }}/>
                    <div dangerouslySetInnerHTML={{
                        __html: pageMaps.content.rendered
                    }}/>
                </div>
                <div className="leafletwrapper">
                    <LeafletMap
                        center={[50, 10]}
                        zoom={2}
                        maxZoom={10}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={false}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    >
                        <GeoJSON
                            data={worldGeoJSON}
                            style={() => ({
                                color: LOADER_COLOR,
                                weight: 0.5,
                                fillColor: LOADER_COLOR,
                                fillOpacity: 0.8,
                            })}
                        />
                        <React.Fragment>
                            {renderedMarkers}
                        </React.Fragment>
                    </LeafletMap>
                </div>
            </div>

        );
    }
}

export default DioramaOSMaps;
