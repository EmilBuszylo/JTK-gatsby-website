import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default class ContactForm extends Component {

  render() {
    const { topic, products, onTopicChange, threads} = this.props;

    return (
        <form>
          <div className="field">
            <label className="label" htmlFor="topic">Temat</label>
            <p className="control">
              <span className="select">
                <select name="topic" id="topic" onChange={(e) => onTopicChange(e)}>
                    {threads.map(thread => (
                        <option key={thread.thread} value={thread.thread}>{thread.thread}</option>
                    ))}
                  <option value="product">Produkt/pakiet</option>
                </select>
              </span>
            </p>
        </div>
        {topic === 'product' ?
          <div className="field">
              <label className="label" htmlFor="product">Temat</label>
              <p className="control">
                <span className="select">
                  <select name="product" id="product">
                    {products.map(({node: product}) => (
                      <option key={product.frontmatter.title} value={product.frontmatter.title}>{product.frontmatter.title}</option>
                    ))}
                  </select>
                </span>
              </p>
          </div>
          : null
        }
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
    </form>
    )
  }
}
