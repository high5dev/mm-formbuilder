import {Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row, TabContent, TabPane} from "reactstrap";
import {Sidebar} from "./leftSidebar";
import {Copy} from "react-feather";
import {BsFillEyeFill} from "react-icons/bs";
import {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getUserData} from "../../../../../auth/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {cloneFormAction, deleteFormAction} from "../../../store/action";
import {useHistory} from "react-router-dom";
import EditModal from "../../../edit/EditModal";

export const Pages = () => {
    // ** dispatch
    const dispatch = useDispatch();


    // ** redux-store
    const store = useSelector((state) => {
        return {
            ...state?.formEditor
        };
    });


    // ** useStates
    const [active, setActive] = useState('')
    const [openEditor, setOpenEditor] = useState(false);


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
        window.open(`/web-preview/${store?.form?._id}&path=${x?.path}`);
    };


    // ** fire
    const MySwal = withReactContent(Swal);
    const handleDeleteForm = async () => {
        const result = await MySwal.fire({
            title: 'Delete?',
            text: 'When a Funnel deleted, it gets inaccessible. Are you sure you want to delete the funnel? ',
            icon: 'danger',
            showCancelButton: true,
            confirmButtonText: 'Delete anyway',
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        });
        if (result.value) {
            await dispatch(deleteFormAction(store.form._id));
            history.push('/form-funnel');
        }
    };

    const handleClone = () => {
        const payload = {
            userId: getUserData().id,
            name: store.form.name,
            memberType: store.form.memberType,
            automateEntry: store.form.automateEntry,
            smartList: store.form.smartList,
            subCategory: store.form.subCategory,
            formType: store.form.formType,
            formData: [...store.form.formData],
            clonedFrom: store.form._id,
            isTemplate: store.form.isTemplate
        };
        dispatch(cloneFormAction(payload)).then((res) => {
            history.push(`/form-funnel/form-setting/${res}`);
        });
    };


    // ** Toggle
    const toggleEditor = () => {
        localStorage.removeItem('gjsProject');
        setOpenEditor(!openEditor);
    };

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
                        {store?.form && store?.form?.formData?.map((x) => (
                            <TabPane tabId={x?.id}>
                                <div className="tasks-area" style={{maxWidth: '100%', width: '100%'}}>
                                    <Fragment>
                                        <div className="m-1">
                                            <div className="d-flex justify-content-between">
                                                <InputGroup size="md">
                                                    <Input
                                                        value={`https://${organization ? organization?.path : 'me'
                                                        }.mymanager.com/web-preview/${store?.form?._id}&path=${x?.path}`}
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
                                                            x.html !== ''
                                                                ? `/web-preview/${store?.form?._id}&path=${x.path}`
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
                                                            onClick={toggleEditor}
                                                        >
                                                            EDIT PAGE
                                                        </Button>

                                                </Col>
                                            </Row>
                                        </div>
                                        <EditModal
                                            toggle={toggleEditor}
                                            open={openEditor}
                                            store={store}
                                            dispatch={dispatch}
                                            step={x}
                                        />
                                    </Fragment>
                                </div>
                            </TabPane>
                        ))}
                    </TabContent>
                </div>
            </Col>
        </Row>
    )
}