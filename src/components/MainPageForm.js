import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Formik } from 'formik';
let yup = require('yup');


const schema = yup.object({
    calendarTitle: yup.string().min(4).max(255).required(),
})


function FormModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-dark text-light" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {console.log(values.calendarTitle)}}
                initialValues={{calendarTitle: ""}}
            >
            {({ 
                handleSubmit,
                handleChange,
                values,
                errors,
            }) => (
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Modal.Body className="bg-dark text-center">
                        <Form.Control 
                            type="text"
                            name="calendarTitle"
                            value={values.calendarTitle}
                            onChange={handleChange}
                            isInvalid={!!errors.calendarTitle}
                            placeholder="Calendar Title"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.calendarTitle && errors.calendarTitle.replace("calendarTitle", "Calendar Title")}
                        </Form.Control.Feedback>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark" >
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                        <Button variant="primary" type="submit">{props.submitText}</Button>
                    </Modal.Footer>
                </Form>
            )}
            </Formik>
        </Modal>
    )
}

function MainPageForm(props) {
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <div>
            <Button variant="dark" onClick={() => setModalShow(true)}>
                Create a Calendar
            </Button>
            <FormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Create a Calendar"
                submitText="Create"
            />
        </div>
    )
}

export default MainPageForm