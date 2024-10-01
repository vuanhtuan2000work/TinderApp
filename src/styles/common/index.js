export const COLOR  = {
    primaryColor: 'white',
    textColor: 'black',
    contentColor: '#505965',
    cerisePink: '#EA4080',
    lightSilver: '#D9D9D9',
    lavenderGray: '#C6C5C7',
    romanSilver: '#828491',
    red: 'red',
    sunsetOrange: '#ff5a5f'
}

export const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  };
  