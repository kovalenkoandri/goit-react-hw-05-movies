import { Outlet } from 'react-router-dom';
import { Container, Header, Link } from 'components/App/App.styled';
import { Suspense } from 'react';
const SharedLayout = () => {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Header>
          <nav>
            <Link to="/" end>
              Home
            </Link>
            <Link to="/movies">Movies</Link>
          </nav>
        </Header>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
