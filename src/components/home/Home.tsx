import React, { Suspense, useEffect, useState } from 'react'
import styles from '@/styles/Home.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hook/hook';
import { fetchFavorites, allProducts, selectFavoritesStatus, selectFavorites } from '@/redux/slices/favoritesSlice';
import dynamic from 'next/dynamic';

const ProductCard = dynamic(() => import('./ProductCard'), {
  loading: () => <div className='skeleton'></div>,
  ssr: false,
});
function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch();
  const allProduct = useAppSelector(allProducts);

  const status = useAppSelector(selectFavoritesStatus);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFavorites());
    }
  }, [status, dispatch]);

  if (!isMounted) return null;



  return (
    <div className={styles.main_container}>
      <Suspense fallback={<p>Loading...</p>}>
        {status === "loading" ? "Products Loading..." : status === 'failed' ? (
          <p>Failed to load products</p>
        ) : allProduct?.length > 0 ? (
          allProduct?.map((item) => (
            <ProductCard
              key={item?.id}
              id={item?.id}
              userProfile={'/images/avatar.png'}
              username={"Username"}
              productImg={item?.thumbnail}
              prodTitle={item?.title} prodPrice={item?.price}
              prodDescription={item?.description}
              likes={32}
              comments={5}
              tags={item?.tags} />
          ))
        ) : (
          <p>Products Not Found</p>
        )}
      </Suspense>

    </div>
  )
}

export default Home