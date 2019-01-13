import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Form = styled.form`
  margin-top: 2em;
`

export const ProductForm = ({title, chosenVersion}) =>
    (
        <Form>
            <div className="field">
                <label className="label" htmlFor="product">Produkt</label>
                <p className="control">
                <span className="select">
                    <select name="product" id="product">
                    <option selected value={title}>{title}</option>
                    </select>
                </span>
                </p>
            </div>
            <div className="field">
                <label className="label" htmlFor="version">Wersja</label>
                <p className="control">
                <span className="select">
                    <select name="version" id="version">
                    <option selected value={chosenVersion.power}>{chosenVersion.power}</option>
                    </select>
                </span>
                </p>
            </div>
            <div className="field">
                <label className="label" htmlFor="email">Email</label>
                <div className="control has-icons-left">
                    <input className="input" name="email" type="email" id="email" placeholder="Twój email" />
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </span>
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="tel">Telefon kontaktowy</label>
                <div className="control has-icons-left">
                    <input className="input" name="tel" id="tel" type="tel" placeholder="Nr telefonu"/>
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faPhone}/>
                    </span>
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="msg">Wiadomość</label>
                <div className="control">
                <textarea className="textarea" id="msg" placeholder="Textarea"></textarea>
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link">Wyślij</button>
                </div>
                <div className="control">
                    <button className="button is-text">Wyczyść</button>
                </div>
            </div>
        </Form>
    )

ProductForm.propTypes = {
  title: PropTypes.string,
}

export default ProductForm
