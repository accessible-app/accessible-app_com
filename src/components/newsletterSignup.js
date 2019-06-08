import React from "react";

const newsletterSignup = ({url}) => (
  <div className="c-newsletter-signup c-newsletter-signup--home" id="newsletter">
    <div className="c-newsletter-signup__text">
      <h2>Newsletter</h2>
      <p>
        Sign up for the newsletter and keep informed about project updates and
        related news:
      </p>
    </div>
    <form
      className="c-newsletter-signup__form"
      action={url}
      method="post"
      target="_blank"
    >
      <input
        type="email"
        id="subscribe_email"
        aria-label="Email address to subscribe"
        name="subscribe_email"
        placeholder="email@domain.com"
        defaultValue=""
        required="required"
        className="c-newsletter-signup__input"
      />
      <input
        type="text"
        id="subscribe_name"
        name="subscribe_name"
        style={{ display: "none" }}
        defaultValue=""
      />
      <button type="submit" name="subscribe_submit" className="o-buttonstyle o-buttonstyle--smaller" value="1">
        Subscribe
      </button>
    </form>
  </div>
);

export default newsletterSignup;
