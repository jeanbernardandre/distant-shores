import React, {Component} from 'react';
import './Blog.css';
import {RingLoader} from 'react-spinners';
import {Helmet} from "react-helmet";
import {ADDRESS_V2} from '../../constants';
import ModalImage from 'react-modal-image'

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      dioramas: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    let pageurl = ADDRESS_V2 + "posts/?categories=6&per_page=100";
    fetch(pageurl).then(response => response.json()).then(response => {
      this.setState({dioramas: response, loading: false})
    })
  }

  render() {
    let {dioramas, loading} = this.state;

    if (loading) {
      return (
          <div className="loading">
            <div className='sweet-loading'>
              <RingLoader color={'#f13ab8'} loading={true}/>
            </div>
          </div>
        )
    }
    let ls = dioramas.map((diorama, index) => {
      const dioramaCat = diorama.categories;
      //console.log('diocat ' + dioramaCat);
      //console.log(diorama.better_featured_image.alt_text+' ee');

      return (dioramaCat == '6' && <div key={index} className="item">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Blog and news concerning Nature miniatures 1 35 - Distant Shores</title>
          <meta name="description" content="Blog and news distant-shores and the nature centered dioramas built throughout the last part of 2017 and in 2018. "/>
          <link rel="canonical" href="http://www.distant-shore.com/Blog"/>
        </Helmet>
        <div className = "item__content item__content--medium">
          <h2 dangerouslySetInnerHTML = {{
              __html: diorama.title.rendered
            }} />
          <h3>{diorama.date.substring(0, 10)}</h3>

          <ModalImage
            small = {diorama.better_featured_image.media_details.sizes.medium_large.source_url}
            large = {diorama.better_featured_image.media_details.sizes.medium_large.source_url}
            alt = {diorama.better_featured_image.alt_text}
            loader = {<RingLoader
               color = {
               '#123abc'
               }
               loading = 'true'
               />}
          />
          <span dangerouslySetInnerHTML = {{
              __html: diorama.content.rendered
            }} />
        </div>
      </div>)
    });
    // console.log(this.state+'eeee');

    return (<div>
      <section className = "blogpage">
        <div className = "columns">
          <div className = "column">
            <div className = "masonry">
              {ls}
            </div>
          </div>
        </div>
      </section>
    </div>);
  }
}

export default Blog;
