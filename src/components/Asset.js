import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

const Asset = ({spin, src, msg}) => {
    return (
        <div className={
            `${
                styles.Asset
            } p-4`
        }>
            {
            spin && <Spinner animation="border"/>}
            {
            src && <img src={src}
                alt={msg}/>
        }
            {
            msg && <p className="mt-4">
                {msg}</p>
        } </div>
    );
};

export default Asset;
