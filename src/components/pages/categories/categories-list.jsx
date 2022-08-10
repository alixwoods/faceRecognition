import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Breadcrumb from '../../common/breadcrumb';
import PtTable from '../../features/elements/table';
import MediaGalleryModal from '../../features/modals/media-gallery-modal';
import PNotify from '../../features/elements/p-notify';
import PtLazyLoad from '../../features/lazyload';

import { getCategories } from '../../../api';
import { removeXSSAttacks, getCroppedImageUrl } from '../../../utils';

export default function CategoriesList ( props ) {
    const type = props.type;
    const [ isFirst, setIsFirst ] = useState( true );
    const [ loading, setLoading ] = useState( true );
    const [ ajax, setAjax ] = useState( {
        data: [],
        total: 0
    } );
    const [ tree, setTree ] = useState( [] );
    const [ selectAll, setSelectAll ] = useState( false );
    const [ search, setSearch ] = useState( '' );
    const [ tableRef, setTableRef ] = useState( null );
    const [ selected, setSelected ] = useState( [] );
    const [ bulk, setBulk ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ slug, setSlug ] = useState( '' );
    const [ desc, setDesc ] = useState( '' );
    const [ parent, setParent ] = useState( 0 );
    const [ media, setMedia ] = useState( null );
    const [ modalOpen, setModalOpen ] = useState( false );

    // Columns
    const columns = [ {
        id: 'name',
        Header: 'Name',
        sortable: true,
        className: "d-block ws-nowrap",
        accessor: d => { return { id: d.id, name: d.name, media: d.media, depth: d.depth } },
        Cell: row => (
            <>
                { row.value.media ?
                    <img
                        className="mr-1"
                        src={ row.value.media.virtual ? row.value.media.copy_link : getCroppedImageUrl( `${ process.env.PUBLIC_URL }/mock-server/images/${ row.value.media.copy_link }`, 150 ) }
                        alt={ row.value.media.alt_text ? row.value.media.alt_text : 'category' }
                        width="60"
                        height="60"
                    />
                    : <img
                        className="border mr-1"
                        src={ `${ process.env.PUBLIC_URL }/assets/images/porto-placeholder-66x66.png` }
                        alt="category"
                        width="60"
                        height="60"
                    />
                }
                <Link to={ `${ process.env.PUBLIC_URL }/categories/${ row.value.id }` }>
                    <strong dangerouslySetInnerHTML={ removeXSSAttacks( '&ndash;'.repeat( row.value.depth ) + row.value.name ) }></strong>
                </Link>
            </>
        )
    }, {
        Header: 'Slug',
        accessor: 'slug',
        sortable: true
    }, {
        Header: 'Description',
        accessor: 'description',
        minWidth: 110
    }, {
        Header: 'Count',
        accessor: 'count',
        sortable: true
    }, {
        Header: 'Actions',
        accessor: 'id',
        className: 'actions',
        headerClassName: "justify-content-center",
        width: 100,
        Cell: row => (
            <>
                <Link to={ `${ process.env.PUBLIC_URL }/categories/${ row.value }` } className="on-default edit-row mr-2"><i className="fas fa-pencil-alt"></i></Link>
                <a href="#del" className="on-default remove-row" onClick={ e => deleteRow( e, row.value ) }><i className="far fa-trash-alt"></i></a>
            </>
        )
    } ];

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
                data: ajax.data.filter( cat => cat.id !== index )
            } );
            setTree( tree.filter( cat => cat.id !== index ) );
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

    function searchCategories ( e ) {
        e.preventDefault();
        tableRef.current.wrappedInstance.filterColumn( { id: 'name' }, search );
    }

    function fetchData ( state ) {
        setLoading( true );
        getCategories( type, state.page * state.pageSize, ( state.page + 1 ) * state.pageSize, state.filtered, state.sorted )
            .then( results => {
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
                if ( isFirst ) {
                    setTree( results.tree );
                    setIsFirst( false );
                }
            } );
    }

    function addCategory ( e ) {
        e.preventDefault();
        let index = ajax.data.findIndex( cat => cat.id === parent );
        let treeIndex = tree.findIndex( cat => cat.id === parent );
        let newId = ajax.total + 1 + parseInt( Math.random() * 100 );
        let newCat = {
            id: newId,
            name: name,
            slug: slug,
            parent: parent,
            description: desc,
            media: media,
            count: 0,
            depth: index >= 0 ? ajax.data[ index ].depth + 1 : 0
        };
        let temp = [ ...ajax.data ];
        temp.splice( index + 1, 0, newCat );
        tree.splice( treeIndex + 1, 0, newCat );
        // setTree
        setAjax( {
            ...ajax,
            data: temp
        } );
        setSelected( [
            ...selected,
            {
                id: newId,
                selected: false
            }
        ] );
        setName( '' );
        setSlug( '' );
        setDesc( '' );
        setMedia( null );
        setTree( [ ...tree ] );
        setParent( 0 );
        toast(
            <PNotify title="Success" icon="fas fa-check" text="Category added successfully." />,
            {
                containerId: "default",
                className: "notification-success"
            }
        );
    }

    function selectImage ( e ) {
        e.preventDefault();
        setModalOpen( true );
    }

    function closeModal ( selectedMedia ) {
        setModalOpen( false );
        if ( selectedMedia.length ) {
            setMedia( selectedMedia[ 0 ] );
        }
    }

    return (
        <>
            <Breadcrumb current={ `${ type === 'products' ? 'Product' : 'Post' } categories` } paths={ [ {
                name: 'Home',
                url: '/'
            }, {
                name: type,
                url: '/' + type
            } ] } />

            <Row>
                <Col xl={ 4 }>
                    <Form method="post" action="#" onSubmit={ addCategory }>
                        <Card className="card-modern">
                            <Card.Body>
                                <Form.Group className="align-items-center">
                                    <Form.Label className="control-label">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxLength="20"
                                        className="form-control-modern"
                                        name="name"
                                        value={ name }
                                        onChange={ e => setName( e.target.value ) }
                                        required
                                    />
                                    <span className="help-block">Name for the category.</span>
                                </Form.Group>
                                <Form.Group className="align-items-center">
                                    <Form.Label className="control-label">Slug</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxLength="20"
                                        className="form-control-modern"
                                        name="slug"
                                        value={ slug }
                                        onChange={ e => setSlug( e.target.value ) }
                                    />
                                    <span className="help-block">Unique slug/reference for the category.</span>
                                </Form.Group>
                                <Form.Group className="align-items-center">
                                    <Form.Label className="control-label">Parent Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-control-modern"
                                        name="parent"
                                        value={ parent }
                                        onChange={ e => setParent( parseInt( e.target.value ) ) }
                                    >
                                        <option value="0">None</option>
                                        {
                                            tree.map( ( cat, index ) => (
                                                <option key={ 'cat-' + index } value={ cat.id } dangerouslySetInnerHTML={ removeXSSAttacks( "&nbsp;".repeat( cat.depth * 3 ) + cat.name ) }></option>
                                            ) )
                                        }
                                    </Form.Control>
                                    <span className="help-block">Parent category to which current category belongs.</span>
                                </Form.Group>
                                <Form.Group className="align-items-center">
                                    <Form.Label className="control-label">Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="form-control-modern"
                                        name="description"
                                        rows="5"
                                        maxLength="200"
                                        value={ desc }
                                        onChange={ e => setDesc( e.target.value ) }
                                    />
                                    <span className="help-block">Add description for the category.</span>
                                </Form.Group>
                                <Form.Group className="d-flex align-items-center">
                                    <Button
                                        href="#mediaGallery"
                                        className="mr-3"
                                        variant="primary"
                                        onClick={ selectImage }
                                    >
                                        Add images
                                    </Button>
                                    <div className="category-image d-inline-block">
                                        { media ?
                                            <PtLazyLoad
                                                src={ media.virtual ? media.copy_link : getCroppedImageUrl( `${ process.env.PUBLIC_URL }/mock-server/images/${ media.copy_link }`, 150 ) }
                                                alt={ media.alt_text ? media.alt_text : 'category' }
                                                width="60"
                                                height="60"
                                            />
                                            : <img
                                                src={ `${ process.env.PUBLIC_URL }/assets/images/porto-placeholder-66x66.png` }
                                                alt="category"
                                                width="60"
                                                height="60"
                                            />
                                        }
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" variant="primary">Add category</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>

                <Col xl={ 8 } className="mt-xl-0 mt-3">
                    <Form id="tags-list-form" method="get" onSubmit={ searchCategories }>
                        <Card className="card-modern">
                            <Card.Body>
                                <div className="datatables-header-footer-wrapper">
                                    <div className="datatable-header">
                                        <Row className="align-items-center mb-3">
                                            <Col sm="auto" className="col-sm-auto ml-auto pl-lg-1">
                                                <div className="search search-style-1 mx-lg-auto w-auto">
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="text"
                                                            className="search-term"
                                                            name="search-term"
                                                            id="search-term"
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
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>

            <MediaGalleryModal chooseOne={ true } isOpen={ modalOpen } onClose={ closeModal } />
        </>
    )
}