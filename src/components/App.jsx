import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from '../service/imgApi';

import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
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

    if (prevSearchValue !== nextSearchValue || prevState.page !== page) {
      this.setState({ loading: true });

      try {
        const response = await imgApi(nextSearchValue, page);
        const { hits, totalHits } = response.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPage: totalHits,
        }));
      } catch (error) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

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

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

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

        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={imgUrl} alt={tag} />
          </Modal>
        )}

        <Loader isLoading={loading} />

        {totalPage / 12 > page && <Button loadMore={this.onLoadMore} />}

        {totalPage === 0 && <ImageErrorView />}

        {error && <ImageErrorView>{error}</ImageErrorView>}
      </>
    );
  }
}
