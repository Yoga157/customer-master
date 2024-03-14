import React, { Fragment, useState, useCallback} from "react";
import "../Modal.scss"

interface IProps {
    description: any;
}

const ModalShowRejectReason: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    return (
        <Fragment>
            <h3>Reason To Reject</h3>
            <p>{props.description}</p>
        </Fragment>
    )
}

export default ModalShowRejectReason;