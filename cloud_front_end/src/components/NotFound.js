import React from "react";
import styles from "../styles/NotFound.module.css";
import Link from "@material-ui/core/Link";

const NotFound = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.mainbox}>
                <div className={styles.err}>404</div>
                <div className={styles.message}>
                    Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? Let's go <Link href="/">home</Link> and try from there.
                </div>
            </div>
        </div>
    )
}

export default NotFound;