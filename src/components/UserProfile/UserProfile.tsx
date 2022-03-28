import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components/macro';

import Card from '../Card/Card';
import Link from '../../components/Link/Link';
import { prefix } from '../../titleGenerator';
import { User } from '../../types/models';
import { mobile } from '../../Me/styles/shared/devices';
import { useFilters } from '../../context/filtersContext/FiltersContext';
import { useMentors } from '../../context/mentorsContext/MentorsContext';
import { useRoutes } from '../../hooks/useRoutes';
import { getTitleTags } from '../../helpers/getTitleTags';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 0 18px;

  @media ${mobile} {
    width: 100%;
  }
`;

export const UserProfile = ({ user }: { user: User }) => {
  const title = `${prefix} | ${user?.name}`;
  const [, dispatch] = useFilters();
  const urls = useRoutes();
  const { favorites, addFavorite } = useMentors();

  useEffect(() => {
    dispatch({ type: 'showFilters', payload: false });
  }, [dispatch]);

  if (!user) {
    return (
      <p>
        User not found <Link href="/">back to home</Link>
      </p>
    );
  }

  return (
    <UserProfileContainer>
      <Head>{getTitleTags(title)}</Head>
      <Link href={urls.root.get()}>Back to mentors list</Link>
      <Card
        appearance="extended"
        mentor={user}
        onFavMentor={addFavorite}
        isFav={favorites.indexOf(user._id) > -1}
      />
    </UserProfileContainer>
  );
};
