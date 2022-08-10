import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Breadcrumb from '../../common/breadcrumb';
import PtTable from '../../features/elements/table';
import PNotify from '../../features/elements/p-notify';

import { getCategoriesTree, getProducts } from '../../../api';
import { removeXSSAttacks, getCroppedImageUrl } from '../../../utils';

export default function ProductList () {
    const [ loading, setLoading ] = useState( true );
    const [ ajax, setAjax ] = useState( {
        data: [],
        total: 0
    } );
    const [ tree, setTree ] = useState( [] );

    // Filter Variables
    const [ cat, setCat ] = useState( '' );
    const [ type, setType ] = useState( '' );
    const [ search, setSearch ] = useState( '' );

    const [ selectAll, setSelectAll ] = useState( false );
    const [ tableRef, setTableRef ] = useState( null );
    const [ selected, setSelected ] = useState( [] );
    const [ bulk, setBulk ] = useState( '' );

    // Columns
    const columns = [ {
        id: 'name',
        Header: 'Name',
        sortable: true,
        style: {
            lineHeight: 1
        },
        className: "d-block ws-nowrap",
        accessor: d => { return { id: d.id, name: d.name, media: d.media } },
        Cell: row => (
            <>
                { row.value.media.length ?
                    <img
                        className="mr-1"
                        src={ getCroppedImageUrl( `${ process.env.PUBLIC_URL }/mock-server/images/${ row.value.media[ 0 ].copy_link }`, 150 ) }
                        alt={ row.value.media[ 0 ].alt_text ? row.value.media[ 0 ].alt_text : 'category' }
                        width="60"
                        height="60"
                    />
                    : <img
                        className="mr-1"
                        src={ `${ process.env.PUBLIC_URL }/assets/images/porto-placeholder-66x66.png` }
                        alt="category"
                        width="60"
                        height="60"
                    />
                }
                <Link to={ `${ process.env.PUBLIC_URL }/products/${ row.value.id }` }>
                    <strong>{ row.value.name }</strong>
                </Link>
            </>
        )
    }, {
        Header: 'SKU',
        accessor: 'sku',
        sortable: true,
        Cell: row => '#' + ( row.value ? row.value : '' )
    }, {
        Header: 'Stock',
        id: 'stock',
        accessor: d => { return { status: d.stock_status, qty: d.stock_quantity } },
        sortable: true,
        Cell: row => row.value.status + ( row.value.status !== 'in-stock' ? ` (${ row.value.qty })` : '' )
    }, {
        Header: 'Price',
        id: 'price',
        accessor: d => { return { prices: d.min_max_price, type: d.type } },
        Cell: row => (
            <>
                {
                    row.value.prices[ 0 ] === row.value.prices[ 1 ] ? '$' + ( row.value.prices[ 0 ] ).toFixed( 2 )
                        : row.value.type === 'simple' ?
                            <div className="product-price">
                                <div className="regular-price on-sale">${ row.value.prices[ 1 ].toFixed( 2 ) }</div>
                                <div className="sale-price">${ row.value.prices[ 0 ].toFixed( 2 ) }</div>
                            </div>
                            : <>
                                ${ row.value.prices[ 0 ].toFixed( 2 ) } &ndash; ${ row.value.prices[ 1 ].toFixed( 2 ) }
                            </>
                }
            </>
        )
    }, {
        Header: 'Categories',
        id: 'categories',
        accessor: 'categories',
        Cell: row => <span style={ {
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical"
        } } > { row.value ? row.value.map( cat => cat.name ).join( ', ' ) : '' }</span >
    }, {
        Header: 'Tags',
        accessor: 'tags',
        Cell: row => row.value ? row.value.map( cat => cat.name ).join( ', ' ) : ''
    }, {
        Header: 'Featured',
        accessor: 'featured',
        sortable: true,
        Cell: row => (
            <a href="#featuredToggle" onClick={ e => featuredToggle( e, row.original.id, !row.value ) }>
                <i className={ `${ row.value ? 'fas' : 'far' } fa-star` }></i>
            </a>
        )
    }, {
        Header: 'Date',
        accessor: 'created_at',
        sortable: true
    }, {
        Header: 'Actions',
        accessor: 'id',
        className: 'actions',
        headerClassName: "justify-content-center",
        width: 100,
        Cell: row => (
            <>
                <Link to={ `${ process.env.PUBLIC_URL }/products/${ row.value }` } className="on-default edit-row mr-2"><i className="fas fa-pencil-alt"></i></Link>
                <a href="#del" className="on-default remove-row" onClick={ e => deleteRow( e, row.value ) }><i className="far fa-trash-alt"></i></a>
            </>
        )
    } ];

    useEffect( () => {
        getCategoriesTree( 'products' ).then( data => {
            setTree( data );
        } );
    }, [] )

    useEffect( () => {
        setSelected( selected.map( item => {
            return {
                ...item,
                selected: selectAll
            }
        } ) );
    }, [ selectAll ] )

    function isSelected ( key ) {
        return selected.find( item => item.id === key && item.selected );
    }

    function onSelectChange ( e, value, row ) {
        setSelected( selected.map( item => {
            if ( item.id === row.id ) {
                return {
                    ...item,
                    selected: !item.selected
                };
            }
            return item;
        } ) );
    }

    function deleteRow ( e, index ) {
        e.preventDefault();
        if ( window.confirm( "Are you sure you want to delete this data?" ) ) {
            setAjax( {
                ...ajax,
                data: ajax.data.filter( item => item.id !== index )
            } );
        }
    }

    function bulkAction ( e ) {
        e.preventDefault();
        if ( !bulk ) {
            return toast(
                <PNotify title="Warning" icon="fas fa-exclamation" text="Please choose one of actions." />,
                {
                    containerId: "default",
                    className: "notification-warning"
                }
            );
        }
        if ( bulk === 'delete' ) {
            if ( !selected.find( item => item.selected ) ) {
                return toast(
                    <PNotify title="Warning" icon="fas fa-exclamation" text="Choose at least one item." />,
                    {
                        containerId: "default",
                        className: "notification-warning"
                    }
                );
            }
            setAjax( {
                ...ajax,
                data: ajax.data.filter( media => selected.find( item => item.id === media.id && !item.selected ) )
            } );
        }
    }

    function searchProducts ( e ) {
        e.preventDefault();
        tableRef.current.wrappedInstance.filterColumn( { id: 'name' }, search );
    }

    function fetchData ( state ) {
        let filtered = [ ...state.filtered ];
        cat !== '' && filtered.push( { id: 'categories', value: cat } );
        type !== '' && filtered.push( { id: 'type', value: type } );
        setLoading( true );
        getProducts( state.page * state.pageSize, ( state.page + 1 ) * state.pageSize, filtered, state.sorted ).then( results => {
            setLoading( false );
            setAjax( {
                data: results.data,
                total: parseInt( results.total / state.pageSize ) + !( !( results.total % state.pageSize ) )
            } );
            setSelected( results.data.map( media => {
                return {
                    id: media.id,
                    selected: false
                }
            } ) );
            setSelectAll( false );
        } );
    }

    function featuredToggle ( e, id, value ) {
        e.preventDefault();
        setAjax( {
            ...ajax,
            data: ajax.data.map( product => {
                if ( product.id === id ) product.featured = value;
                return product;
            } )
        } );
    }

    return (
        <>
            <Breadcrumb current={ 'All Products' } paths={ [ { name: 'Home', url: '/' } ] } />

            <Card className="card-modern">
                <Card.Body>
                    <Form method="GET" action="#" onSubmit={ searchProducts }>
                        <div className="datatables-header-footer-wrapper overflow-lg-auto overflow-xl-unset">
                            <div className="datatable-header">
                                <Row className="align-items-lg-center mb-3">
                                    <Col lg="auto" className="mb-3 mb-lg-0">
                                        <Button
                                            as={ Link }
                                            to={ `${ process.env.PUBLIC_URL }/products/create` }
                                            className="font-weight-semibold"
                                            variant="primary"
                                            size="md"
                                        >+ Add Product</Button>
                                    </Col>
                                    <Col lg="auto" className="col-8 ml-lg-auto mb-3 mb-lg-0">
                                        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                                            <Form.Label className="ws-nowrap mr-3 mb-0">Filter By:</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="select-style-1 filter-by my-1 mr-2 w-lg-auto"
                                                value={ cat }
                                                onChange={ e => setCat( e.target.value ) }
                                            >
                                                <option value=''>All Category</option>
                                                { tree.map( ( item, index ) => (
                                                    <option key={ `cat-${ index }` } value={ item.slug } dangerouslySetInnerHTML={ removeXSSAttacks( '&ndash;'.repeat( item.depth ) + item.name ) }></option>
                                                ) ) }
                                            </Form.Control>
                                            <Form.Control
                                                as="select"
                                                className="select-style-1 filter-by my-1 mr-2"
                                                value={ type }
                                                onChange={ e => setType( e.target.value ) }
                                            >
                                                <option value=''>All Type</option>
                                                <option value="simple">Simple</option>
                                                <option value="variable">Variable</option>
                                            </Form.Control>
                                            <Button
                                                type="submit"
                                                className="filter-btn my-1"
                                                variant="primary"
                                            >Filter</Button>
                                        </div>
                                    </Col>
                                    <Col lg="auto" className="col-12">
                                        <div className="search search-style-1 mx-lg-auto my-1">
                                            <InputGroup>
                                                <Form.Control
                                                    type="text"
                                                    className="search-term"
                                                    placeholder="Search"
                                                    value={ search }
                                                    onChange={ e => setSearch( e.target.value ) }
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="default" type="submit"><i className="bx bx-search"></i></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <PtTable
                                className="table table-ecommerce-simple -striped mb-0"
                                data={ ajax.data }
                                loading={ loading }
                                columns={ columns }
                                pages={ ajax.total }
                                pageSize={ 12 }
                                manual
                                onFetchData={ fetchData }
                                selectAll={ selectAll }
                                toggleAll={ () => setSelectAll( !selectAll ) }
                                isSelected={ key => isSelected( key ) }
                                toggleSelection={ onSelectChange }
                                onChangeRef={ ref => setTableRef( ref ) }
                            />

                            <div className="datatable-footer">
                                <Row className="align-items-center justify-content-between mt-3">
                                    <Col md="auto" className="mb-3 mb-lg-0">
                                        <div className="d-flex">
                                            <Form.Control
                                                as="select"
                                                className="select-style-1 bulk-action w-auto mr-3"
                                                value={ bulk }
                                                onChange={ e => setBulk( e.target.value ) }
                                                style={ { minWidth: "120px" } }
                                            >
                                                <option value="">Bulk Actions</option>
                                                <option value="delete">Delete</option>
                                            </Form.Control>
                                            <Button
                                                href="#bulk-action"
                                                className="bulk-action-apply border font-weight-semibold text-color-dark text-3"
                                                variant="light"
                                                onClick={ bulkAction }
                                            >Apply</Button>
                                        </div>
                                    </Col>
                                    <Col lg="auto" className="mb-3 mb-lg-0">
                                        <div className="pagination-wrapper d-flex justify-content-lg-end">
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}