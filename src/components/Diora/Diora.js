import React from 'react';
import './Diora.css';
import {Switch, Route} from 'react-router-dom';

import Dioralist from './../Dioralist'; // single
import Diorama from './../Diorama'; // single
import {Helmet} from "react-helmet";

const Diora = () => (<div>
  <Helmet>
    <meta charSet="utf-8"/>
    <title>Diorama full list : Nature miniatures 1 35 from Jean Diorama - Distant Shores</title>
    <meta
        name="description"
        content="This page shows all the nature centered dioramas I have been building throughout the last part of 2017 and in 2018. "
      />
    <link rel="canonical" href="http://www.distant-shore.com/Diora"/>
  </Helmet>
  <Switch>
    <Route exact path='/Diora' component={Dioralist}/>
    <Route path='/Diora/:number' component={Diorama}/>
  </Switch>
</div>);

export default Diora;
