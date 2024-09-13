const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// Генератор нового уникально кода
// Может конечно надо было новый файл создать))
export function generateCode(maxCode) {
  let id = maxCode;

  return function*() {
    while (true) {
      yield id++;
    }
  }
}

// Склоение слова "раз"
export function declineWord(number) {
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  if ([2,3,4].includes(remainder10) && ![12,13,14].includes(remainder100)) {
    return 'раза';
  }
  else {
    return 'раз';
  }
}