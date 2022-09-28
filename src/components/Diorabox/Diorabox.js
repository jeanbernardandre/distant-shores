import React, {Component} from 'react';
import './Diorabox.css';
import {Link} from 'react-router-dom';
import {RingLoader} from 'react-spinners';
import {Img} from 'react-image';
import {Diorama} from '../Diorama';

class Diorabox extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {dioramas, loading, error, isthree} = this.props;
        if (loading) {
            return (
                <div className='sweet-loading'>
                    <RingLoader
                        color={'#123abc'}
                        loading={true}
                    />
                </div>
            )
        }
        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            dioramas.map((diorama, index) => {
                const dioramacat = parseInt(diorama.categories[0]);
                return (
                    dioramacat === 2 &&
                    <div className={isthree ? 'column is-3' : ''} key={index} id={`suite-${index}`}>
                        <div className="item_d">
                            <Link to={`/Diorama/${diorama.id}`}>
                                <Img
                                    alt={diorama.better_featured_image.alt_text}
                                    src={[
                                        diorama.better_featured_image.media_details.sizes.medium.source_url,
                                    ]}
                                    loader={
                                        <RingLoader
                                            color={'#123abc'}
                                            loading={true}
                                        />
                                    }
                                />
                            </Link>
                            <div className="item-overlay top"></div>
                        </div>
                        <div className="item_d">
                            <Link to={`/Diorama/${diorama.id}`}><h2>{diorama.title.rendered}</h2></Link>
                            <div
                                dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}
                            />
                            <Link to={`/Diorama/${diorama.id}`}> [+]</Link>
                        </div>
                    </div>
                )
            })
        );
    }
}

export default Diorabox;
