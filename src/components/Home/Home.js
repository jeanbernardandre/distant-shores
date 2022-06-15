import React, {Component} from 'react';
import Modal from 'react-modal';
import Draggable from 'react-draggable'; // Both at the same time
import Marquee from 'react-smooth-marquee';
import {Helmet} from "react-helmet";
import BodyClassName from 'react-body-classname';
import {ADDRESS_V2} from '../../constants';
import './Home.css';
import Homediorama from './../Homediorama';
import Blogbox from './../Blogbox';
import NewsBox from '../NewsBox';

class Home extends Component
{
    constructor() {
        super();
        this.state = {
            diorama: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                acf: {
                    rendered: ''
                }
            },
            acfimg: {
                galerie: []
            },
            showModal: true,
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.clique = this.clique.bind(this);
    }

    //fonctions pour draggable

    getInitialState() {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: 0,
                y: 0
            },
            controlledPosition: {
                x: -600,
                y: 200
            }
        };
    }

    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    }

    onStart() {
        this.setState({
            activeDrags: ++this.state.activeDrags
        });
    }

    onStop() {
        this.setState({
            activeDrags: --this.state.activeDrags
        });
    }

    clique(modal) {
        //  alert(modal);
        //document.getElementById(modal).style.zIndex = 9999;
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    onReady(event) {
        event.target.mute();
        // access to player in all event handlers via event.target
        // event.target.mute();
    }

    onEnd(event) {
        event.target.playVideo();
    }

    componentDidMount() {
        let pageurl = ADDRESS_V2 + "pages/34";
        //console.log(pageurl);
        fetch(pageurl).then(response => response.json()).then(response => {
            this.setState({diorama: response})
        });

    }

    render() {
        const dragHandlers = {
            onStart: this.onStart,
            onStop: this.onStop
        };

        let {diorama} = this.state;

        const divStyle = {
            //marginTop: '31em',
        };

        const bgImg = diorama.better_featured_image ? diorama.better_featured_image.media_details.sizes.medium_large.source_url : '';

        return (
            <div key={diorama.id}>
                <BodyClassName className="homepage"/>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Nature Dioramas miniatures 1 35 from Jean Diorama - Distant Shores</title>
                    <meta name="description"
                          content="This website shows the nature centered dioramas I have been building throughout the last part of 2017 and in 2018. The rules of the game are pretty simple : I bought a series of 3d boxes and I fill them with little scenes that must not be more than 2cm high."/>
                    <link rel="canonical" href="http://www.distant-shore.com/"/>
                </Helmet>
                <div>
                    <Modal ariaHideApp={false} isOpen={this.state.showModal}
                           contentLabel="Modal #1 Global Style Override Example" onRequestClose={this.handleCloseModal}
                           className="Modal is-hidden-touch " style={{
                            position: 'absolute'
                    }}>
                        <Draggable {...dragHandlers}>
                            <div className="ModalBody" onClick={this.clique('modal1')}>
                                <div className="closeButton">
                                    <a onClick={this.handleCloseModal} href="#">
                                        <svg viewBox="0 0 24 24">
                                            <path
                                                d="M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <h2 className="title">News</h2>
                                <div className="inner">
                                    <NewsBox/>
                                </div>
                            </div>
                        </Draggable>
                    </Modal>
                </div>

                <div className="is-hidden-desktop accrochemobile" style={{backgroundImage: `url(${bgImg})`}}>
                    <h1>Distant Shores</h1>
                </div>

                <div className="is-hidden-touch ">
                    <div key={diorama.id}
                         className="header-home home"
                         style={{backgroundImage: `url(${bgImg})`}}
                    >
                        <h1 className="index">
                            <img src="http://www.distant-shores.com/wp-content/themes/seadiorama/img/distantshoresb.svg"
                                 width="800" alt="Distant Shores Dioramas" className="dislogo"/>
                        </h1>
                    </div>
                </div>
                <div className="is-hidden-touch" style={divStyle}>
                    <Marquee>
                        {diorama.acf.marquee}
                    </Marquee>
                </div>
                <Blogbox/>
                <section className="container vignette">
                    <div className="column is-one-third">
                        Latest dioramas
                    </div>
                    <React.Fragment>
                        <Homediorama/>
                    </React.Fragment>
                </section>
            </div>);
    }
}

export default Home;
