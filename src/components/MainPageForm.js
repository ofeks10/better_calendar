import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function FormModal(props) {
    const [validated, setValidated] = React.useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        console.log(form.calendar_title.value)
        event.preventDefault()

        setValidated(true)
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-dark text-light" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a Calendar
                </Modal.Title>
            </Modal.Header>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <Modal.Body className="bg-dark text-center">
                    <Form.Control 
                        required
                        type="text"
                        placeholder="Calendar Title"
                        name="calendar_title"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a Calendar title.
                    </Form.Control.Feedback>
                </Modal.Body>
                <Modal.Footer className="bg-dark" >
                    <Button variant="primary" type="submit">Create</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
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
            />
        </div>
    )
}

export default MainPageForm