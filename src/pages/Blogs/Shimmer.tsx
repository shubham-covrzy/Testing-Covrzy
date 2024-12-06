import style from './index.module.scss';
export const SkeletonBlogCard = () => (
    <div className={style.skeleton} style={{ height: '300px', marginBottom: '16px' }} />
);

export const SkeletonBlogBannerCard = () => (
    <div className={style.skeleton} style={{ height: '250px', marginBottom: '16px' }} />
);
