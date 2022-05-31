import {Link, Outlet} from "react-router-dom";
import {Fragment} from "react";
import {ReactComponent as CrwnLogo} from "../../assets/086 crown.svg";
import "./navigation.styles.scss"

const Navigation = () => (
    <Fragment>
        <div className='navigation'>
            <Link className="link" to="/ ">
                <CrwnLogo className="logo"/>
            </Link>
            <div className='nav-links-container'>
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                <Link className="nav-link" to="/sign">
                    SING IN
                </Link>
            </div>
        </div>
        <Outlet/>
    </Fragment>
)


export default Navigation;