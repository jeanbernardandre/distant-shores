import React, {Component} from 'react';
import './Newsbox.css';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR, NEWSBOXADDRESS} from '../../constants';
import {Link} from "react-router-dom";
import {Img} from 'react-image';


class dioramasBox extends Component {
    _isMounted = false;

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
        this._isMounted = true; //permet d'éviter des  warnings https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
        this.setState({loading: true});
        let pageurl = NEWSBOXADDRESS;
        console.log('pageurl');
        console.log(pageurl);

        fetch(pageurl).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        dioramas: data,
                        loading: false,
                    })
                }
            })
            .catch(error => this.setState({error, loading: false}));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {dioramas, error} = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        let newsBoxAcroche ='';
        if (dioramas.length !== 0) {
            newsBoxAcroche =
                <div className="newsboxTitle">
                    <div className="container ">
                    </div>
                </div>
        }

        let newBox =
            dioramas.map((diorama, index) => {
            const dioramaCat = parseInt(diorama.categories[0]);
            let plus = dioramaCat === 14 ? <Link to={`/Diorama/${diorama.id}`} className="plus">+</Link> : '';

            return (
                <div className="newsboxInline" key={index} id={`suite-${index}`}>
                    <div className="item_d">
                        {dioramaCat === 14 &&
                        <Link to={`/Diorama/${diorama.id}`}>

                            <Img
                                alt={diorama.title}
                                src={[
                                    diorama.fimg_url
                                ]}
                                loader={
                                    <CircleLoader
                                        color={LOADER_COLOR}
                                        loading={true}
                                    />
                                }
                            />
                        </Link>
                        }
                        {dioramaCat !== 14 &&
                        <Img
                            alt={diorama.title}
                            src={[
                                diorama.fimg_url
                            ]}
                            loader={
                                <CircleLoader
                                    color={LOADER_COLOR}
                                    loading={true}
                                />
                            }
                        />
                        }
                        <div className="item-overlay top"></div>
                    </div>
                    <div className="item_d">
                        {dioramaCat === 14 &&
                            <Link to={`/Diorama/${diorama.id}`}><h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2></Link>
                        }
                        {dioramaCat !== 14 &&
                            <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2>
                        }

                        <div dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}/>
                        {plus}
                        <div>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                {newsBoxAcroche}
                <div className="container newsbox">
                    {newBox}
                    { this.state.isLoading && (
                        <div className="loading">
                            <div className='sweet-loading'>
                                <CircleLoader
                                    color={ LOADER_COLOR }
                                    loading={ true }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default dioramasBox;
