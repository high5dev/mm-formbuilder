import {Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import {Sidebar} from "./leftSidebar";
import {Copy} from "react-feather";
import {BsFillEyeFill} from "react-icons/bs";
import {Fragment} from "react";

export const Pages = () => {

    return (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border">
              <Sidebar
              />
              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                  <Fragment>
                      <div className="m-1">
                          <div className="d-flex justify-content-between">
                              <InputGroup size="md">
                                  <Input

                                  />
                                  <InputGroupText>
                                      <Button color="link" className="p-0" >
                                          <Copy />
                                      </Button>
                                  </InputGroupText>
                              </InputGroup>
                              <Button
                                  color="primary"
                                  className="ms-2"
                                  style={{ minWidth: '120px' }}
                              >
                                  <BsFillEyeFill className="me-1" />
                                  View
                              </Button>
                          </div>
                          <Card style={{ height: '100%', borderRadius: 10, marginTop: '1em' }} className={`shadow`}>
                              <CardBody>
                                  <iframe

                                  />
                              </CardBody>
                          </Card>
                          <Row>
                              <Col className="d-flex flex-row-reverse">
                                      <Button
                                          color="danger"
                                      >
                                          REMOVE
                                      </Button>

                                  <Button
                                      color="outline-primary"
                                      className="me-2"
                                  >
                                      CLONE
                                  </Button>
                                      <Button
                                          color="primary"
                                          className="me-2"
                                      >
                                          EDIT PAGE
                                      </Button>
                              </Col>
                          </Row>
                      </div>
                          {/*<EditModal*/}
                          {/*    toggle={toggleEditor}*/}
                          {/*    open={openEditor}*/}
                          {/*    store={store}*/}
                          {/*    dispatch={dispatch}*/}
                          {/*    step={step}*/}
                          {/*/>*/}
                  </Fragment>
              </div>
            </div>
          </Col>
        </Row>
    )
}