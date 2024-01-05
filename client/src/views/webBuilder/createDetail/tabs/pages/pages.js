import {Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row, TabContent, TabPane} from "reactstrap";
import {Sidebar} from "./leftSidebar";
import {Copy} from "react-feather";
import {BsFillEyeFill} from "react-icons/bs";
import {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getUserData} from "../../../../../auth/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {cloneFormAction, deleteFormAction, deleteWebsiteAction, duplicateWebsiteAction, getPageAction} from "../../../store/action";
import {useHistory} from "react-router-dom";
import DuplicateModal from '../../../editor/topNav/duplicate/duplicateModal';

export const Pages = () => {
    // ** dispatch
    const dispatch = useDispatch();


    // ** redux-store
    const store = useSelector((state) => {
        return {
            ...state?.websiteEditor
        };
    });


    // ** useStates
    const [active, setActive] = useState('');
    const [pageData, setPageData] = useState('');
    const [duplicateMdl, setDuplicateMdl] = useState(false);

    useEffect(() => {
        if (store?.form?.formData?.length > 0) {
            setActive(store.form.formData[0]._id);
        }
    }, [store?.form?.formData]);

    useEffect(() => {
        if (active) {
            dispatch(getPageAction(active)).then((res) => {
                setPageData(res);
            });
        }
    }, [active]);

    const _toggleDuplicate = () => {
        setDuplicateMdl(!duplicateMdl);
    };


    // ** constants
    const organization = JSON.parse(localStorage.getItem('organization'));
    const user = getUserData()
    const history = useHistory();


    // ** functions
    const handleCopyUrl = (x) => {
        navigator.clipboard.writeText(
            `https://${organization ? organization?.path : 'me'}.mymanager.com/web-preview/${store?.form?._id
            }&path=${x?.path}`
        );
        toast.success('URL copied!');
    };


    const handleViewUrl = (x) => {
        window.open(`/website/${store?.form?._id}`);
    };


    // ** fire
    const MySwal = withReactContent(Swal);
    const handleDeleteForm = async () => {
        const result = await MySwal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to delete the website? ',
            icon: 'danger',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-danger ms-1',
            },
            buttonsStyling: false,
        });
        if (result.value) {
            await dispatch(deleteWebsiteAction(store.form._id));
            history.push('/business/tools');
        }
    };

    const handleClone = () => {
        _toggleDuplicate();
    };

    const openEditor = () => {
        history.push(`/webpages/editor/${store?.form._id}`);
    }

    return (
        <Row style={{width: '100%', margin: '0px', padding: '0px'}}>
            <Col xl="12" xs={{order: 0}} md={{order: 1, size: 12}} style={{padding: '0px'}}>
                <div className="tasks-border">
                    <Sidebar
                        active={active}
                        setActive={setActive}
                        dispatch={dispatch}
                        store={store}
                    />
                    <TabContent activeTab={active} className={'w-100'}>
                        {store?.form && store?.form?.formData?.map((x) => {
                            return <TabPane tabId={x?._id}>
                                <div className="tasks-area" style={{maxWidth: '100%', width: '100%'}}>
                                    <Fragment>
                                        <div className="m-1">
                                            <div className="d-flex justify-content-between">
                                                <InputGroup size="md">
                                                    {/* <Input
                                                        value={`https://${organization ? organization?.path : 'me'
                                                        }.mymanager.com/web-preview/${store?.form?._id}&path=${x?.path}`}
                                                        disabled="true"
                                                    /> */}
                                                    <Input
                                                        value={`https://${organization ? organization?.path : 'me'
                                                        }.mymanager.com/website/${store?.form?._id}`}
                                                        disabled="true"
                                                    />
                                                    <InputGroupText>
                                                        <Button color="link" className="p-0" onClick={()=> handleCopyUrl(x)}>
                                                            <Copy/>
                                                        </Button>
                                                    </InputGroupText>
                                                </InputGroup>
                                                <Button
                                                    color="primary"
                                                    className="ms-2"
                                                    style={{minWidth: '120px'}}
                                                    onClick={()=> handleViewUrl(x)}

                                                >
                                                    <BsFillEyeFill className="me-1"/>
                                                    View
                                                </Button>
                                            </div>
                                            <Card style={{height: '100%', borderRadius: 10, marginTop: '1em'}}
                                                  className={`shadow`}>
                                                <CardBody>
                                                    <iframe
                                                        scrolling="no"
                                                        className="shadow-sm"
                                                        style={{
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            width: '100%',
                                                            border: 'none',
                                                            height: '400px',
                                                            borderRadius: 10
                                                        }}
                                                        key={x.html?.length}
                                                        src={
                                                            pageData !== ''
                                                                ? `/preview${x.path}`
                                                                : `/logo.html`
                                                        }
                                                    />
                                                </CardBody>
                                            </Card>
                                            <Row>
                                                <Col className="d-flex flex-row-reverse">

                                                    <Button
                                                        color="danger"
                                                        onClick={handleDeleteForm}
                                                    >
                                                        REMOVE
                                                    </Button>


                                                    <Button
                                                        color="outline-primary"
                                                        className="me-2"
                                                        onClick={handleClone}
                                                    >
                                                        CLONE
                                                    </Button>

                                                    <Button
                                                        color="primary"
                                                        className="me-2"
                                                        onClick={openEditor}
                                                    >
                                                        EDIT PAGE
                                                    </Button>

                                                </Col>
                                            </Row>
                                        </div>
                                        {/* <EditModal
                                            toggle={toggleEditor}
                                            open={openEditor}
                                            store={store}
                                            dispatch={dispatch}
                                            step={x}
                                        /> */}
                                    </Fragment>
                                </div>
                            </TabPane>
                        })}
                    </TabContent>
                </div>
            </Col>
            <DuplicateModal store={store} isOpen={duplicateMdl} toggle={_toggleDuplicate}/>
        </Row>
    )
}