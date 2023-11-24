import React from "react";

export const Footer = () => {
  return (
    <footer id="contact">
      <div>© 2023 LaNaturalezaComoArte</div>
      <div>
        <h3>Contáctanos</h3>
        <div className="contact-us">
          <span>
            WhatsApp:{" "}
            <strong>
              <a
                href="https://wa.me/447529429948"
                target="_blank"
                rel="noopener noreferrer"
              >
                +44 7529 429948
              </a>
            </strong>
          </span>
          <span>
            Email:{" "}
            <strong>
              <a
                href="mailto:lanaturalezacomoarte@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                lanaturalezacomoarte@gmail.com
              </a>
            </strong>
          </span>
        </div>
      </div>
    </footer>
  );
};
