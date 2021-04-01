export const getTotal = (arr) => {
  if (arr && Array.isArray(arr)) {
    return arr.reduce((count, item) => {
      if (item.dailymenu) {
        return count + item.options.price; 
      }
      return count + item.order.reduce((num, ord) => num + (ord.price * ord.order_count), 0);
    }, 0);
  }
  return 0;
};
