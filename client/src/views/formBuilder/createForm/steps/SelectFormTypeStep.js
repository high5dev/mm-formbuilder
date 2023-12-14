import React from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'

export default function SelectFormTypeStep({setForm,stepper,form}) {
    const handleSelect = (type) =>{
        setForm({...form,isTemplate:type==="template"?true:false})
    }
  return (
    <div>
        <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <p className='text-center'>Create reusable Template</p>
                            <Button className='w-100' color='primary' outline onClick={()=>handleSelect("template")} >Select</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <p className='text-center'>Create a form to interact</p>
                            <Button className='w-100' color='primary' outline onClick={()=>handleSelect("form")} >Select</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className='d-flex justify-content-end mt-1'>
                <Button color='primary' onClick={()=>stepper.next()}>Next</Button>
            </div>
    </div>
  )
}
