import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import qs from 'qs'

export default class ContactForm extends Component {
  state = {
    isSend: false,
    withError: false,
    form: {
      topic: '',
      product: '',
      email: '',
      tel: '',
      msg: '',
      politicy: false,
      rodo: false,
      page: '',
    },
  }

  componentDidMount = () => {
    const { threads } = this.props

    if (threads && threads.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        form: {
          ...prevState.form,
          product: threads[0].thread,
        },
      }))
    }
  }

  mapFormTopics = data => {
    switch (data.topic) {
      case 'produkt':
        data.topic = 'produkt'
        return data
      case 'Usterki/problemy':
        data.topic = 'awaria'
        return data
      case 'Obsługa':
        data.topic = 'przeglad'
        return data
      case 'Inne':
        data.topic = 'inne'
        return data
      case 'Przegląd':
        data.topic = 'przeglad'
        return data
      default:
        break
    }
  }

  onSubmit = (e, formData) => {
    const { threads } = this.props
    e.preventDefault()
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'

    let data = formData
    data.page = this.props.page
    this.mapFormTopics(data)

    axios({
      method: 'post',
      url: 'http://aim123.ayz.pl/formRespond/',
      data: qs.stringify(data),
      crossdomain: true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
      .then(response => {
        if (response.status === 200) {
          this.setState(prevState => ({
            isSend: true,
          }))
        }
      })
      .catch(response => {
        console.log(response)
        this.setState(prevState => ({ isSend: false, withError: true }))
      })
      .finally(() => {
        setTimeout(() => {
          this.setState(prevState => ({
            ...prevState,
            form: {
              ...prevState.form,
              topic: threads && threads.length > 0 ? threads[0].thread : '',
              email: '',
              tel: '',
              msg: '',
              page: '',
            },
          }))
        }, 100)
      })
  }

  onChangeInputText = e => {
    const key = e.target.name
    const value = e.target.value

    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value,
      },
    }))
  }

  onInputCheck = e => {
    const key = e.target.name
    const initialState = this.state[key]
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: !initialState,
      },
    }))
  }

  onChangeSelectValue = e => {
    this.props.onTopicChange(e)
    const key = e.target.name
    const value = e.target.value
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value,
      },
    }))
  }

  onChangeIsSending = () => {
    this.setState(prevState => ({ isSend: false, withError: false }))
  }

  render () {
    const { topic, products, threads } = this.props
    const { form, isSend, withError } = this.state
    return (
      <Fragment>
        {isSend && !withError && (
          <div className='notification is-primary'>
            <button className='delete' onClick={this.onChangeIsSending} />
            Zapytanie zostało wysłane poprawnie
          </div>
        )}
        {isSend && withError && (
          <div className='notification is-danger'>
            <button className='delete' onClick={this.onChangeIsSending} />
            Wystąpił problem techniczny, prosimy spróbować ponownie później
          </div>
        )}
        <form onSubmit={e => this.onSubmit(e, form)}>
          <div className='field'>
            <label className='label' htmlFor='topic'>
              Temat
            </label>
            <p className='control'>
              <span className='select'>
                <select
                  name='topic'
                  id='topic'
                  required
                  onChange={e => this.onChangeSelectValue(e)}
                >
                  {threads.map(thread => (
                    <option key={thread.thread} value={thread.thread}>
                      {thread.thread}
                    </option>
                  ))}
                  <option value='product'>Produkt/pakiet</option>
                </select>
              </span>
            </p>
          </div>
          {products && products.length && topic === 'product' ? (
            <div className='field'>
              <label className='label' htmlFor='product'>
                Temat
              </label>
              <p className='control'>
                <span className='select'>
                  <select
                    name='product'
                    id='product'
                    onChange={e => this.onChangeSelectValue(e)}
                  >
                    {products.map(({ node: product }) => (
                      <option
                        key={product.frontmatter.title}
                        value={product.frontmatter.title}
                      >
                        {product.frontmatter.title}
                      </option>
                    ))}
                  </select>
                </span>
              </p>
            </div>
          ) : null}
          <div className='field'>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <div className='control has-icons-left'>
              <input
                className='input'
                name='email'
                type='email'
                id='email'
                placeholder='Twój email'
                onChange={e => this.onChangeInputText(e)}
                required
                value={form.email}
              />
              <span className='icon is-small is-left'>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label' htmlFor='tel'>
              Telefon kontaktowy
            </label>
            <div className='control has-icons-left'>
              <input
                className='input'
                name='tel'
                id='tel'
                type='tel'
                placeholder='Nr telefonu'
                value={form.tel}
                onChange={e => this.onChangeInputText(e)}
              />
              <span className='icon is-small is-left'>
                <FontAwesomeIcon icon={faPhone} />
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label' htmlFor='msg'>
              Wiadomość
            </label>
            <div className='control'>
              <textarea
                className='textarea'
                id='msg'
                name='msg'
                placeholder='Treść wiadomości'
                required
                value={form.msg}
                onChange={e => this.onChangeInputText(e)}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <label className='checkbox' htmlFor='politicy'>
                <input
                  type='checkbox'
                  required
                  name='politicy'
                  id='politicy'
                  onChange={e => this.onInputCheck(e)}
                />{' '}
                akceptuję{' '}
                <a href='/polityka-prywatnosci' target='_blank'>
                  Politykę Prywatności serwisu
                </a>
              </label>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <label className='checkbox' htmlFor='rodo'>
                <input
                  type='checkbox'
                  name='rodo'
                  id='rodo'
                  required
                  onChange={e => this.onInputCheck(e)}
                />{' '}
                zapoznałem się z{' '}
                <a href='/rodo' target='_blank'>
                  RODO
                </a>
              </label>
            </div>
          </div>
          <div className='field is-grouped'>
            <div className='control'>
              <button type='submit' className='button is-link'>
                Wyślij
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    )
  }
}
