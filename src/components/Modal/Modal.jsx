import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // слушатель для клавиш
  componentDidMount() {
    window.addEventListener('keydown', this.handleClickEsc);
  }

  // очищаем после себя при закрытии модального окна
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClickEsc);
  }

  handleClickEsc = e => {
    // проверка на нажатие клавиши Esc
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // закрытие модального окна по клику на бекдроп
  handleClickBackdrop = e => {
    // проверка, был ли клик на бекдропе
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalDiv>{children}</ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
