import { useEffect } from 'react';

export default function CoffeeWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    const div = document.getElementById('supportByBMC');

    script.setAttribute('data-name', 'BMC-Widget');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-id', 'luneberry');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', '방문해 주셔서 감사합니다 :D');
    script.setAttribute('data-color', '#40DCA5');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;

    script.onload = function () {
      const evt = document.createEvent('Event');
      evt.initEvent('DOMContentLoaded', false, false);
      window.dispatchEvent(evt);
    };

    document.head.appendChild(script);
    if (div) {
      div.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div id="supportByBMC"></div>;
}
