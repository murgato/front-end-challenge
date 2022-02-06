import { Container, Navbar } from "react-bootstrap";
import "../../css/header.css";
import Logo from "../../util/image/Logo.png";
import { Link } from "react-router-dom";
import { useShallowEqualSelector } from "../../hooks/useShallowEqualSelector";
import { IMoviesStates } from "../../store/ducks/movies/types";

const Header = () => {
  const { pagination }: IMoviesStates = useShallowEqualSelector<IMoviesStates>(
    //@ts-ignore
    (state) => state.movies
  );

  return (
    <>
      <Navbar className="navbar-custom">
        <Container>
          <Navbar.Brand>
            <Link to={`/movies/page=${pagination.currentPage}`}>
              <img alt="logo" src={Logo} className="d-inline-block align-top" />
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
