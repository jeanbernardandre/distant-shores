import React, {Component} from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {DOMAIN_NAME, ROOT_ADRESS} from '../../constants';
import Tooltip from 'rc-tooltip';
import {isMobile} from 'react-device-detect';

import facebook from './../../img/facebook.svg';
import instagram from './../../img/instagram.svg';
import logo from './../../img/distantshoresg.svg';
import logoSrc from './../../img/distantshoresg.svg';
import jbaMob from './../../img/logo2.svg';
import jba from './../../img/logo2.svg';
//import AdvertBox from "../../components/Boxes/AdvertBox";



class Nav extends Component {
    constructor() {
        super();
        this.state = {
            liens: [],
            active: false,
        }
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    };

    componentDidMount() {
        let pageurl = ROOT_ADRESS + 'wp-json/menus/v1/menus/seadiorama';
        fetch(pageurl).then(response => response.json()).then(response => {
            this.setState({liens: response.items});
        })
    }

    cinq = (el) => {
        return (el.substring(0, 5));
    }

    render() {
        let {liens} = this.state;

        let ls = liens.map((lien, index) => {
            return (
                <Link key={index} to={'/' + this.cinq(lien.title)} className="navbar-item baisse"
                      onClick={this.toggleClass}>
                    {lien.title}
                </Link>)
        });

        let tooltip;
        if (isMobile) {
            tooltip =
                <Tooltip
                    placement="top"
                    trigger={['hover']}
                    overlay={<span>Distant Shores, my other website with nature based boxed dioramas</span>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <span className="icon" style={{color: '#bbb'}}>
                      <img src={jbaMob} alt=""/>
                    </span>
                </Tooltip>
        } else {
            tooltip =
                <span className="icon" style={{color: '#bbb'}}>
                      <img src={jba} alt=""/>
                </span>
        }

        return (
            <div>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="navbar-item logo" href={DOMAIN_NAME}>
                            <img className="dslogo" src={logoSrc} alt="Distant Shores Dioramas"/>
                        </a>
                        <div
                            className={this.state.active ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
                            id="burgerking"
                            data-target="navMenubd-example"
                            onClick={this.toggleClass}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div id="navMenubd-example" className={this.state.active ? 'navbar-menu is-active' : 'navbar-menu'}>
                        <div className="navbar-start">
                            <Link to={'/'} className="navbar-item baisse">
                                Home
                            </Link>
                            {ls}
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <a
                                    className="navbar-item"
                                    href="http://www.distant-shores.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {tooltip}
                                </a>
                                <a
                                    className="navbar-item"
                                    href="https://www.facebook.com/jbadiorama"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="icon" style={{color: '#bbb'}}>
                                      <img src={facebook} alt=""/>
                                    </span>
                                </a>
                                <a
                                    className="navbar-item "
                                    href="https://www.instagram.com/jean_diorama/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="icon" style={{color: '#bbb'}}>
                                      <img src={instagram} alt=""/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <section className="brand"><h3 className="page"> [by Jean Diorama]</h3></section>
            </div>
        );
    }
}

export default Nav;
