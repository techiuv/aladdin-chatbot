import React from 'react';
import { Helmet } from "react-helmet-async";

const Title = ({ title = "This is a default title" }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default Title;
