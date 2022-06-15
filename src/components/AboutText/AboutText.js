import React, {Component} from 'react';
import './AboutText.css';
import {ADDRESS_V2} from '../../constants';
import {RingLoader} from 'react-spinners';
class AboutText extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      diorama: {
        title: {
          rendered: ''
        },
        content: {
          rendered: ''
        }
      },
      acfimg: {
        galerie: []
      }
    }
  }
  componentDidMount() {
    this.setState({loading: true});
    let pageurl = ADDRESS_V2 + 'pages/9';
    fetch(pageurl).then(response => response.json()).then(response => {
      this.setState({diorama: response, loading: false})
    });
  }
  render() {
    let {diorama, loading} = this.state;
       if(loading){
         return(
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

    return (<div key={diorama.id}>
        <h1 dangerouslySetInnerHTML={{
          __html: diorama.title.rendered
        }}/>
      <div dangerouslySetInnerHTML={{
          __html: diorama.content.rendered
        }}/>
      <img src={diorama.better_featured_image && diorama.better_featured_image.media_details.sizes.medium.source_url}
           alt={""}
        />
      <div></div>
    </div>);
  }
}
export default AboutText;
