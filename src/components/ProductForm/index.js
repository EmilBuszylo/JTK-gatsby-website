import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";

const Form = styled.form`
  margin-top: 2em;
`;

export const ProductForm = ({ title, chosenVersion }) => (
  <Form>
    <div className="field">
      <label className="label" htmlFor="product">
        Produkt
      </label>
      <p className="control">
        <span className="select">
          <select name="product" id="product" required>
            <option selected value={title}>
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
          <select name="version" id="version" required>
            <option selected value={chosenVersion.power}>
              {chosenVersion.power}
            </option>
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
          placeholder="Textarea"
        />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" required /> akceptuję{" "}
          <a href="/polityka-prywatnosci" target="_blank">
            Politykę Prywatności serwisu
          </a>
        </label>
      </div>
    </div>
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" required /> zapoznałem się z{" "}
          <a href="/rodo" target="_blank">
            {" "}
            RODO{" "}
          </a>
        </label>
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
);

ProductForm.propTypes = {
  title: PropTypes.string
};

export default ProductForm;
