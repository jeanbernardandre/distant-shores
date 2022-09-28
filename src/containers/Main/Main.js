import React, {Component} from 'react';
import './Main.css';
import {Routes, Route} from 'react-router-dom';
import Diora from './../../components/Diora'; //liste
import Home from './../../components/Home';
import About from './../../components/About';
import NotFound from './../../components/NotFound';
import Diorama from './../../components/Diorama';

/*
Erreur ligne 26 en extraProps
*/

class Main extends Component
{
  render() {
    return (
      <main id="main">
         <Routes>
           <Route exact path='/' element={<Home />}/>
           <Route path='/diora/*' element={<Diora />}/>
           <Route exact path='/about' element={<About />}/>
           <Route exact path='/diorama/*' element={<Diorama />}/>
           <Route element={ NotFound } />
         </Routes>
          <div className="sentinel"></div>
       </main>
    );
  }
}
/*
<Route path='/diora/:number' component={Diorama}/>

What does the <Route> render?
Routes have three props that can be used to define what should be rendered when the route’s path matches. Only one should be provided to a <Route> element.

component — A React component. When a route with a component prop matches, the route will return a new element whose type is the provided React component (created using React.createElement).
render — A function that returns a React element [5]. It will be called when the path matches. This is similar to component, but is useful for inline rendering and passing extra props to the element.
children — A function that returns a React element. Unlike the prior two props, this will always be rendered, regardless of whether the route’s path matches the current location.

<Route path='/page' component={Page} />
const extraProps = { color: 'red' }
<Route path='/page' render={(props) => (
  <Page {...props} data={extraProps}/>
)}/>
<Route path='/page' children={(props) => (
  props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
*/
export default Main;
