import React from 'react';

const styles = {
    footer: 'mt-[80px] -mx-4 sm:-mx-6 lg:-mx-8 h-[120px] bg-accent',
};

const Footer: React.FC = () => {
    return <footer className={styles.footer}/>;
};

export default Footer;
