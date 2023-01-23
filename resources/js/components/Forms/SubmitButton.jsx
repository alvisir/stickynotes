import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";

const SubmitButton = props => {
    return (
        <div className="d-grid gap-2">
            <Button type="submit" variant="dark" size="lg" disabled={props.submitting}>
                {!props.submitting ? props.label : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            </Button>
        </div>
    )
}

export default SubmitButton;
