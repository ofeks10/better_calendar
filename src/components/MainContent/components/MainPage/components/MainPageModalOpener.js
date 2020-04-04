import React from 'react'
import Button from 'react-bootstrap/Button'
import MainFormModal from './MainFormModal.js'

function MainPageModalOpener(props) {
    const [modalShow, setModalShow] = React.useState(false)

    return (
        <div>
            <Button variant="dark" onClick={() => setModalShow(true)}>
                Create a Calendar
            </Button>
            <MainFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Create a Calendar"
                submitText="Create"
            />
        </div>
    )
}

export default MainPageModalOpener