import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from 'service/imgApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export default class App extends Component {
  state = {
    textQuery: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    error: null,
    totalPage: null,
  };

  async componentDidUpdate(_, prevState) {
    let { page } = this.state;
    const prevSearchValue = prevState.textQuery;
    const nextSearchValue = this.state.textQuery;

    // Проверяем, изменились ли значения поискового запроса или страницы
    if (prevSearchValue !== nextSearchValue || prevState.page !== page) {
      // Запускаем индикатор загрузки
      this.setState({ loading: true });

      // Отправляем запрос на бэкенд
      try {
        const response = await imgApi(nextSearchValue, page);
        const { hits, totalHits } = response.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPage: totalHits,
        }));
      } catch (error) {
        this.setState({ error: 'Something wrong. Please try again.' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  // Обработчик отправки поискового запроса из Searchbar
  handleSubmit = searchValue => {
    this.setState({
      textQuery: searchValue,
      page: 1,
      images: [],
      loading: false,
      showModal: false,
      error: null,
      totalPage: null,
    });
  };

  // Обработчик кнопки "Загрузить еще"
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // Обработчик открытия модального окна
  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  // Обработчик закрытия модального окна
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, showModal, imgUrl, tag, loading, totalPage, error, page } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.onOpenModal} />

        {/* Модальное окно */}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={imgUrl} alt={tag} />
          </Modal>
        )}

        {/* Индикатор загрузки */}
        <Loader isLoading={loading} />

        {/* Кнопка "Загрузить еще" */}
        {totalPage / 12 > page && <Button loadMore={this.onLoadMore} />}

        {/* Ничего не найдено */}
        {totalPage === 0 && <ImageErrorView />}

        {/* Ошибка запроса */}
        {error && <ImageErrorView>{error}</ImageErrorView>}
      </>
    );
  }
}
