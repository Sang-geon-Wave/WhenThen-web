import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsHeaderComponent {
  highlight: boolean;
}

const HeaderComponent: React.FunctionComponent<ProbsHeaderComponent> = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const isLogIn = true;
  return (
    <div className={styles.headerComponent}>
      <header>
        <div className={styles.header}>
          <h1 className={styles.logo}>
            <a href="#">
              <img
                src="https://pbs.twimg.com/profile_images/1121985451907137536/2Uq0Ih-2_400x400.jpg"
                width="40vh"
                height="40vh"
              />
            </a>
            <span>WhenThen</span>
          </h1>
          <div className={styles.blank}></div>
          <div className={styles.button}>
            <span>about</span>
          </div>
          <div className={styles.button}>
            {isLogIn === true ? <span>log out</span> : <span>sign up</span>}
          </div>
          <div className={styles.button}>
            {isLogIn === true ? (
              <a href="#">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaboC_OonRfowhuzgVIZ7BkLQYiWNeSQkfA&usqp=CAU"
                  width="50%"
                  height="70%"
                />
              </a>
            ) : (
              <span>log out</span>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}></main>

      <footer style={{ textAlign: 'left' }} className={styles.footer}>
        <div style={{ fontSize: '20' }}>
          <li>정보1</li>
          <li>정보2</li>
          <li>정보3</li>
        </div>
        <div className={styles.linkButtonSet}>
          <div className={styles.linkButton}>git</div>
          <div className={styles.linkButton}>notion</div>
          <div className={styles.linkButton}></div>
        </div>
      </footer>
    </div>
  );
};

export default HeaderComponent;
