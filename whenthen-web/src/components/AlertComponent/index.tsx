import React, { useEffect, useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export enum AlertType {
  Information = 'Information',
  Confirmation = 'Confirmation',
  Warning = 'Warning',
  Danger = 'Danger',
}

export interface AlertProps {
  alertContent: string;
  alertType?: AlertType;
  handleConfirm?: Function;
  handleCancel?: Function;
}

export const DefaultAlertProps: AlertProps = {
  alertContent: '',
  alertType: AlertType.Information,
  handleConfirm: () => {},
  handleCancel: () => {},
};

const AlertComponent = () => {
  const { screenClass, alertModalVisibility, alertModalProps, removeAlert } =
    useRootData(({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      alertModalVisibility: appStore.alertModalVisibility.get(),
      alertModalProps: appStore.alertModalProps.get(),
      removeAlert: appStore.removeAlert,
    }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const alertRef = useRef<HTMLDivElement>(null);
  const overlayTarget = useRef(null);

  const clickConfirm = () => {
    removeAlert();
    if (alertModalProps!.handleConfirm) alertModalProps?.handleConfirm();
  };
  const clickCancel = () => {
    removeAlert();
    if (alertModalProps!.handleCancel) alertModalProps?.handleCancel();
  };

  useEffect(() => {
    const onClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (target === alertRef.current && alertModalVisibility) {
        removeAlert();
      }
    };

    document.addEventListener('click', onClickEvent);

    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  });

  return (
    <Overlay target={overlayTarget.current} show={alertModalVisibility}>
      {() => (
        <div ref={alertRef} className={styles.mainBlock}>
          <div className={styles.alertBlock}>
            <div className={styles.alertContent}>
              {alertModalProps?.alertContent}
            </div>
            <div className={styles.buttonBlock}>
              <Button
                variant={
                  alertModalProps?.alertType == AlertType.Warning
                    ? 'warning'
                    : 'primary'
                }
                className={styles.buttonClick}
                onClick={clickConfirm}
              >
                확인
              </Button>
              {(alertModalProps?.alertType == AlertType.Confirmation ||
                alertModalProps?.alertType == AlertType.Danger) && (
                <Button
                  variant={
                    alertModalProps?.alertType == AlertType.Confirmation
                      ? 'outline-secondary'
                      : 'outline-danger'
                  }
                  className={styles.buttonClick}
                  onClick={clickCancel}
                >
                  취소
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default AlertComponent;
