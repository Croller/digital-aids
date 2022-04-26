const getOrderId = () => {
  const path = this.window.location.href;
  const paths = path.split('/');
  const indexID = paths.findIndex(f => f === 'id');
  const orderID = paths[indexID + 1];
  return orderID;
};

const createElement = (tag = 'div', className = null, style = null) => {
  const elem = document.createElement(tag);
  if (className) elem.className = className;
  if (style) elem.setAttribute('style', style);
  return elem;
};  

const getElemets = (str = null) => {
  if (!str) return null;
  const arr = document.querySelector(str);
  return arr;
}

const initIframe = () => {
  const className = 'iframe__container';
  const elements = getElemets(`.${className}`);
  if (!elements) {
    const id = getOrderId();
    const element = createElement('iframe', 'iframe__container');
    element.src = `https://paytesting.prodamus.me/experiment/${id}`;
    document.body.appendChild(element);
  }
};
