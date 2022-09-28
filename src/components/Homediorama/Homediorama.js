import React, { Component } from 'react';
import './Homediorama.css';
import {CircleLoader} from 'react-spinners';
import {
    LOADER_COLOR,
    ADDRESS_DIORAMAS_LIMIT,
} from './../../constants';
import {InfiniteScroll} from 'react-simple-infinite-scroll';
import {Link} from "react-router-dom";
import {Img} from 'react-image';

class Homediorama extends Component
{
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            items: [],
            total_pages: 0,
            isLoading: true,
            cursor: 0,
            dioramaPage: ''
        }
    }

    loadUser = () => {
        this.setState({ isLoading: true, error: undefined })
        let {items, cursor} = this.state;
        cursor +=1;

        //console.log(ADDRESS_DIORAMAS_LIMIT + cursor);

        fetch(ADDRESS_DIORAMAS_LIMIT + cursor)
            .then(response => {
                for (let pair of response.headers.entries()) {
                    if (pair[0] === 'x-wp-totalpages') {
                        this.setState(state => ({
                            total_pages:  pair[1]
                        }))
                    }
                }
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(
                response => {
                    this.setState(state => ({
                        items: [...items, ...response],
                        cursor: cursor,
                        isLoading: false
                    }))
                },
                error => {
                    this.setState({ isLoading: false, error })
                }
            )
    };

    componentDidMount() {
        this._isMounted = true; //permet d'éviter des  warnings https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
        this.setState({ loading: true, dioramaPage: this.props.page });
/*        console.log(this.props.page);
        console.log('this.props');*/

        this.loadUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {items, total_pages, cursor, isLoading, dioramaPage} = this.state;
        if (cursor <= total_pages) {
            this.cursor = 'lol';
        }

        let ls = items.map((diorama, index) => {
            const dioramaCat = parseInt(diorama.categories[0]);
            //console.log('dioramaCatdd');
/*
            console.log(dioramaCat);
*/
            let plus = dioramaCat === 2 ? <Link to={`/Diorama/${diorama.id}`} className="plus">+</Link> : '';

            return (
                <div className='column is-3' key={index} id={`suite-${index}`}>
                    <div className="item_d">
                        {dioramaCat === 2 &&
                        <Link to={`/Diorama/${diorama.id}`} key={`${diorama.id}`}>
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
                        {dioramaCat !== 2 &&
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
                        {dioramaCat === 2 &&
                            <Link to={`/Diorama/${diorama.id}`} key={diorama.id}>
                                <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2>
                            </Link>
                        }
                        {dioramaCat !== 2 &&
                            <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2>
                        }
                        <div dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}/>
                            {plus}
                        <div>
                        </div>
                    </div>
                </div>
            )}
        )
        /*console.log('dioramaPage');
        console.log(dioramaPage);*/
        return (
            <div>
                {dioramaPage === 'dioramaPage' &&
                    <div className="column header-galery">
                        <h1 className="header-page">Dioramas</h1>
                    </div>
                }
                <InfiniteScroll
                    throttle={100}
                    threshold={300}
                    isLoading={isLoading}
                    hasMore={!!cursor}
                    onLoadMore={this.loadUser}
                >
                    <section className="vignette" key={5444444}>
                        <div className="columns is-multiline liste is-centered">
                            {ls}
                        </div>
                    </section>
                </InfiniteScroll>


                {this.state.isLoading && (
                    <div className="loading">
                        <div className='sweet-loading'>
                            <CircleLoader
                                color={LOADER_COLOR}
                                loading={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Homediorama;
