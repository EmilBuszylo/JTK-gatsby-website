import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import qs from 'qs';

const Form = styled.form`
  margin-top: 2em;
`;

export default class ProductForm extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    isSend: false,
    withError: false,
    form: {
      product: '',
      version: '',
      email: '',
      tel: '',
      msg: '',
      politicy: false,
      rodo: false,
      page: 'produkt',
    },
  };

  componentDidMount = () => {
    const { title, chosenVersion, version } = this.props;

    let defaultVersion = '';

    if (chosenVersion && chosenVersion.power) {
      defaultVersion = chosenVersion.power;
    } else if (version && version.length > 0) {
      defaultVersion = version[0].power;
    }

    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        product: title,
        version: defaultVersion,
      },
    }));
  };

  onSubmit = (e, formData) => {
    e.preventDefault();
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';

    let data = formData;

    formData.topic = `${formData.product} o mocy ${formData.version}`;

    axios({
      method: 'post',
      url: 'https://serwer1924674.home.pl/jtlsPhpMailer/index.php',
      data: qs.stringify(data),
      crossdomain: true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
      .then(response => {
        if (response.status === 200) {
          this.setState(prevState => ({ isSend: true }));
        }
      })
      .catch(response => {
        this.setState(prevState => ({ isSend: false, withError: true }));
      })
      .finally(() => {
        setTimeout(() => {
          this.setState(prevState => ({
            ...prevState,
            form: {
              ...prevState.form,
              email: '',
              tel: '',
              msg: '',
              page: 'produkt',
            },
          }));
        }, 100);
      });
  };

  onChangeInputText = e => {
    const key = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  };

  onInputCheck = e => {
    const key = e.target.name;
    const initialState = this.state[key];
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: !initialState,
      },
    }));
  };

  onChangeSelectValue = e => {
    this.props.onTopicChange(e);
    const key = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  };

  onChangeVersion = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  };

  onChangeIsSending = () => {
    this.setState(prevState => ({ isSend: false, withError: false }));
  };

  render() {
    const { title, chosenVersion, version } = this.props;
    const { form, isSend, withError } = this.state;

    return (
      <Fragment>
        {isSend && !withError && (
          <div className="notification is-primary">
            <button className="delete" onClick={this.onChangeIsSending} />
            Zapytanie zostało wysłane poprawnie
          </div>
        )}
        {isSend && withError && (
          <div className="notification is-danger">
            <button className="delete" onClick={this.onChangeIsSending} />
            Wystąpił problem techniczny, prosimy spróbować ponownie później
          </div>
        )}
        <Form onSubmit={e => this.onSubmit(e, this.state.form)}>
          <div className="field">
            <label className="label" htmlFor="product">
              Produkt
            </label>
            <p className="control">
              <span className="select">
                <select
                  name="product"
                  id="product"
                  required
                  onChange={e => this.onChangeSelectValue(e)}
                >
                  <option defaultValue={title} value={title}>
                    {title}
                  </option>
                </select>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label" htmlFor="version">
              Wersja
            </label>
            <p className="control">
              <span className="select">
                <select
                  name="version"
                  id="version"
                  required
                  onChange={e => this.onChangeVersion(e)}
                >
                  {version.map((item, index) => {
                    if (item.power === chosenVersion.power) {
                      return (
                        <option
                          defaultValue={index}
                          key={item.power + index}
                          value={item.power}
                        >
                          {item.power}
                        </option>
                      );
                    } else {
                      return (
                        <option key={item.power + index} value={item.power}>
                          {item.power}
                        </option>
                      );
                    }
                  })}
                </select>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                name="email"
                type="email"
                id="email"
                value={form.email}
                onChange={e => this.onChangeInputText(e)}
                placeholder="Twój email"
                required
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="tel">
              Telefon kontaktowy
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                name="tel"
                id="tel"
                type="tel"
                value={form.tel}
                onChange={e => this.onChangeInputText(e)}
                placeholder="Nr telefonu"
                required
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faPhone} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="msg">
              Wiadomość
            </label>
            <div className="control">
              <textarea
                required
                className="textarea"
                id="msg"
                name="msg"
                value={form.msg}
                onChange={e => this.onChangeInputText(e)}
                placeholder="Textarea"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox" htmlFor="politicy">
                <input
                  type="checkbox"
                  required
                  name="politicy"
                  onChange={e => this.onInputCheck(e)}
                />{' '}
                akceptuję{' '}
                <a href="/polityka-prywatnosci" target="_blank">
                  Politykę Prywatności serwisu{' '}
                </a>
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox" htmlFor="rodo">
                <input
                  type="checkbox"
                  name="rodo"
                  required
                  onChange={e => this.onInputCheck(e)}
                />{' '}
                zapoznałem się z{' '}
                <a href="/rodo" target="_blank">
                  RODO
                </a>
              </label>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Wyślij</button>
            </div>
          </div>
        </Form>
      </Fragment>
    );
  }
}
