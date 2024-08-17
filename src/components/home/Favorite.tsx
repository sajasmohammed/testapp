import React, { Suspense, useEffect, useState } from 'react';
import styles from '@/styles/Home.module.scss';
import { useAppSelector } from '@/redux/hook/hook';
import { selectFavorites, selectFavoritesStatus } from '@/redux/slices/favoritesSlice';
import dynamic from 'next/dynamic';

const FavoriteCard = dynamic(() => import('./FavoriteCard'), {
  loading: () => <div className='skeleton'></div>,
  ssr: false,
});

function Favorites() {
  const [isMounted, setIsMounted] = useState(false);
  const favorites = useAppSelector(selectFavorites);
  const status = useAppSelector(selectFavoritesStatus);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.main_container}>
      <Suspense fallback={<p>Loading...</p>}>
        {status === 'failed' ? (
          <p>Failed to load favorites</p>
        ) : favorites?.length > 0 ? (
          favorites?.map((item) => (
            <FavoriteCard
              key={item?.id}
              id={item?.id}
              userProfile={'/images/avatar.png'}
              username={"Username"}
              productImg={item?.thumbnail}
              prodTitle={item?.title}
              prodPrice={item?.price}
              prodDescription={item?.description}
              likes={32}
              comments={5}
              tags={item?.tags}
            />
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </Suspense>
    </div>
  );
}

export default Favorites;
