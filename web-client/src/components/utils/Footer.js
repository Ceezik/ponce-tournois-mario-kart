import React from 'react';

function Footer() {
    return (
        <footer>
            Fait avec le{' '}
            <span role="img" aria-label="coeur">
                💜
            </span>{' '}
            par{' '}
            <a
                className="primaryLink"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Ceezik"
            >
                Ceezik
            </a>
        </footer>
    );
}

export default Footer;
