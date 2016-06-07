import classes from './header.scss';

class Header extends React.Component {
   render () {
     return <div className={classes.header}>
              <h1>一起逛商家平台</h1>
            </div>;
    }
}

export default Header;
