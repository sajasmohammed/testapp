import React from 'react';
import styles from '@/styles/Header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav>
        <Image className={styles.icon} src={'/images/home_filled.svg'} height={40} width={40} priority alt='Home' onClick={() => router.push('/')} />
        <Image className={styles.icon} src={'/images/fav_white.svg'} height={40} width={40} priority alt='Favorite' onClick={() => router.push('/favorite')} />
      </nav>
    </header>
  );
};

export default Header;
