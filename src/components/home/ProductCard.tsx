import React, { useMemo, useState } from 'react'
import styles from '@/styles/Home.module.scss';
import Image from 'next/image';
import SHA256 from 'crypto-js/sha256';
import { addFavorite, selectFavorites, undoFavorite } from '@/redux/slices/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook/hook';
import ImageWithLoader from '../ImageWithLoader';

interface props {
    id: number,
    username: string,
    userProfile: string,
    productImg: string,
    prodTitle: string,
    likes: number,
    comments: number,
    tags: [],
    prodPrice: string,
    prodDescription: string
}
function ProductCard({ id, userProfile, username, productImg, prodTitle, prodPrice, prodDescription, likes, comments, tags }: props) {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);

    const handleAddFavorite = () => {
        dispatch(addFavorite({ id: id, title: prodTitle, price: prodPrice, description: prodDescription, thumbnail: productImg, tags: tags }));
    };
    const handleUndoFavorite = () => {
        dispatch(undoFavorite({ id: id, title: prodTitle, price: prodPrice, description: prodDescription, thumbnail: productImg, tags: tags }));
    };


    const isFavorite = useMemo(() => {
        return favorites?.some(favProduct => favProduct?.id === id);
    }, [favorites, id]);

    return (
        <div className={styles.card_wrap}>
            <div className={styles.card_head}>
                <div className={styles.user_profile}>
                    <Image className={styles.img} src={userProfile} height={40} width={40} alt='avatar' />
                    <p>{username}</p>
                </div>
            </div>
            <div className={styles.card_content}>
                <ImageWithLoader className={styles.product_img} src={productImg} alt={prodTitle} />

                <div className={styles.prod_details}>
                    <div className={styles.title_wrap}>
                        <h1 className={styles.title}>{prodTitle}</h1>
                        <p className={styles.subtitle}>AED {prodPrice}</p>
                    </div>

                    <Image className={styles.like_icon} src={isFavorite ? '/images/liked.svg' : '/images/unlike.svg'} height={30} width={30} alt='like' onClick={() => {
                        if (isFavorite) {
                            handleUndoFavorite()
                        } else {
                            handleAddFavorite()
                        }
                    }} />

                </div>
            </div>
            <div className={styles.card_footer}>
                <div className={styles.likes}>
                    <Image src={'/images/fav_purple.svg'} height={20} width={20} alt='avatar' />
                    <p>{likes} Likes</p>
                </div>
                <div className={styles.description}>
                    {prodDescription}
                </div>
                <div className={styles.tags}>
                    {tags?.map(tag => (
                        <li key={SHA256(tag).toString()}>
                            #{tag}
                        </li>
                    ))}
                </div>
                <div className={styles.comments}>
                    View {comments} Comments
                </div>
            </div>
        </div>
    )
}

export default ProductCard