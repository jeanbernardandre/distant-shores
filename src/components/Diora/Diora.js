import React, {Component} from 'react';
import './Diora.css';
import {Routes, Route} from 'react-router-dom';

import Dioralist from './../Dioralist'; // single
import Diorama from './../Diorama'; // single
import {Helmet} from "react-helmet";
import {ADDRESS_V2} from "../../constants";
import {RingLoader} from "react-spinners";
import Diorabox from "../Diorabox";
import {HashLink as Link} from "react-router-hash-link";



/*const Diora = () => (<div>
  <Helmet>
    <meta charSet="utf-8"/>
    <title>Diorama full list : Nature miniatures 1 35 from Jean Diorama - Distant Shores</title>
    <meta
        name="description"
        content="This page shows all the nature centered dioramas I have been building throughout the last part of 2017 and in 2018. "
      />
    <link rel="canonical" href="http://www.distant-shore.com/Diora"/>
  </Helmet>
</div>);*/


class Diora extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
        }
    }

//https://www.robinwieruch.de/react-fetching-data/
    componentDidMount() {
        this.setState({loading: true});
        let pageurl = ADDRESS_V2 + "posts/?categories=2";
/*        console.log('eeeeeee');
        alert(pageurl);*/

        fetch(pageurl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                this.setState({
                    dioramas: data,
                    loading: false,
                })
            })
            .catch(error => this.setState({error, loading: false}));
    }

    render() {
        console.log(this.state);
        let {dioramas, loading, error} = this.state;
        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader
                            color={'#f13ab8'}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
                <section className="vignette" id="top">
                    <div className="column is-one-third header-page"><h1 className="header-page">Dioramas</h1></div>

                    <div className="columns is-multiline liste is-centered">
                        <React.Fragment>
                            <Diorabox dioramas={dioramas} loading={loading} error={error} isthree={true}/>
                        </React.Fragment>
                    </div>
                </section>
                <div className="more"><Link smooth to="/Diora#top">Top of the page</Link></div>
            </div>
        );
    }
}


export default Diora;
