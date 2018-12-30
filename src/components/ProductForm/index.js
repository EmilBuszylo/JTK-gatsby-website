import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 2em;
`

export const ProductForm = ({title}) =>
    (
        <Form>
            <div className="field">
                <label className="label" htmlFor="product">Produkt</label>
                <p className="control has-icons-left">
                <span className="select">
                    <select name="product" id="product">
                    <option selected>{title}</option>
                    </select>
                </span>
                </p>
            </div>
            <div className="field">
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                    <input className="input" name="email" type="email" id="email" placeholder="Twój email" />
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="tel">Telefon kontaktowy</label>
                <div className="control">
                    <input className="input" name="tel" id="tel" type="tel" placeholder="Nr telefonu"/>
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
